import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
	useGetBlogDetailQuery,
	useUpdateBlogMutation,
	useUploadBlogImageMutation,
} from "../../slices/blogsApiSlice";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {toast} from "react-toastify";
import {convert} from "html-to-text";


const BlogEditScreen = () => {
	const { id: blogId } = useParams();
  const navigate = useNavigate();

	const options = {
		wordwrap: 130,
		// ...
	};

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");

	const { data: blog, isLoading, error, refetch } = useGetBlogDetailQuery(blogId);

	const [updateBlog, { isLoading: loadingUpdate }] = useUpdateBlogMutation();
	const [uploadBlogImage, { isLoading: loadingUpload }] =
		useUploadBlogImageMutation();

	useEffect(() => {
		if (blog) {
			setTitle(blog.title);
			setDescription(blog.description);
			setImage(blog.image);
		}
	}, [blog]);

	

	const handleDescriptionChange = (value) => {
		setDescription(value);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const desText = convert(description, options);
			await updateBlog({
        blogId,
				image,
        title,
        description: desText,
			}).unwrap();
			toast.success("Blog updated");
			refetch();
			navigate("/blogs");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

  const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		try {
			const res = await uploadBlogImage(formData).unwrap();
			toast.success(res.message);
			setImage(res.image);
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};


	return (
		<>
			<Link to="/blogs" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Blog</h1>
				{loadingUpdate && <Loader />}
				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error.data.message}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}></Form.Control>
							<Form.Control
								label="Choose File"
								onChange={uploadFileHandler}
								type="file"></Form.Control>
							{loadingUpload && <Loader />}
						</Form.Group>
						<Form.Group controlId="title" className="my-3">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter blog title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="description" className="my-3">
							<Form.Label>Description</Form.Label>
							<ReactQuill
								theme="snow"
								value={description}
								onChange={handleDescriptionChange}
								modules={{
									toolbar: [
										[{ header: "1" }, { header: "2" }, { font: [] }],
										[{ size: [] }],
										["bold", "italic", "underline", "strike", "blockquote"],
										[
											{ list: "ordered" },
											{ list: "bullet" },
											{ indent: "-1" },
											{ indent: "+1" },
										],
										["clean"],
									],
								}}
							/>
						</Form.Group>
						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default BlogEditScreen;

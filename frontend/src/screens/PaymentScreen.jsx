import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Form, Col, Button } from "react-bootstrap";
import { savePaymentMethod } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Meta from "../components/Meta";

const PaymentScreen = () => {
	const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	useEffect(() => {
		if (!shippingAddress.address) {
			navigate("/shipping");
		}
	}, [shippingAddress, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	return (
		<FormContainer>
			<Meta title="ByteHub Payment" />
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler} className="mb-4">
				<Form.Group>
					<Form.Label as="legend">Choose Payment Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							className="my-2"
							label="Cash on Delivery"
							id="Cash-on-Delivery"
							name="paymentMethod"
							value="Cash on Delivery"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
					</Col>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
			<Message>Currenly, payment is only accepted on cash. Other payment methods will be available soon. We are truly sorry for inconvenience and want to say thank you to all our customers for understanding us.</Message>
		</FormContainer>
	);
};

export default PaymentScreen;

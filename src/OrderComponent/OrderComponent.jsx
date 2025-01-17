import React, { useState } from 'react';

const OrderComponent = () => {
    const unitPrice = 999; // price per pillow
    const [quantity, setQuantity] = useState(3);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
    });
    const subtotal = (unitPrice * quantity).toFixed(2);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = { ...formData, quantity, subtotal: parseFloat(subtotal) };
        try {
            const response = await fetch('https://sekendfirstdatabasebacend.onrender.com/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="product-summary p-3 border rounded">
                        <h3>
                            Lumbar Support Pillow × <span>{quantity}</span>
                        </h3>
                        <div className="quantity d-flex align-items-center mb-3">
                            <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                            <input
                                type="text"
                                value={quantity}
                                className="form-control mx-2 text-center"
                                readOnly
                                style={{ width: '50px' }}
                            />
                            <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
                        </div>
                        <p className="price fs-5">৳ <span>{subtotal}</span></p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="billing-details p-3 border rounded">
                        <h3>Billing details</h3>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">আপনার নাম লিখুন *</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control mb-3"
                                placeholder="আপনার নাম"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />

                            <label className="form-label">মোবাইল নাম্বার লিখুন *</label>
                            <input
                                type="text"
                                name="mobile"
                                className="form-control mb-3"
                                placeholder="মোবাইল নাম্বার"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                required
                            />

                            <label className="form-label">আপনার ঠিকানা লিখুন *</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control mb-3"
                                placeholder="বাসা নং, রোড নং, থানা, জেলা"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />

                            <button type="submit" className="btn btn-warning w-100">
                                Place Order ৳ <span>{subtotal}</span>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="order-summary p-3 border rounded">
                        <h3>Your order</h3>
                        <p>Product: Lumbar Support Pillow × <span>{quantity}</span></p>
                        <p>Subtotal: ৳ <span>{subtotal}</span></p>
                        <p>Shipping: <strong>ডেলিভারি চার্জ ফ্রি</strong></p>
                        <p>Total: ৳ <span>{subtotal}</span></p>
                        <p>Cash on delivery: Pay with cash upon delivery</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderComponent;

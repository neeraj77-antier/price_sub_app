import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBillingInfo } from '../store/planSlice';
import { durations } from '../data/plans';
import { CreditCard, Check } from 'lucide-react';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPlan, duration, isSubscription } = useSelector((state) => state.plan);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');

  if (!selectedPlan) {
    navigate('/pricing');
    return null;
  }

  const durationData = durations.find(d => d.years === duration);
  const basePrice = selectedPlan.basePrice * duration;
  const discountedPrice = basePrice * (1 - durationData.discount);
  const finalPrice = isSubscription ? discountedPrice * 0.9 : discountedPrice;

  const handlePayment = (success = true) => {
    if (!name || !email) {
      alert('Please fill in all required fields');
      return;
    }

    dispatch(setBillingInfo({ name, email }));
    navigate(success ? '/success' : '/cancel');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Checkout</h1>
          <p className="text-slate-600">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Billing Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <button
                  onClick={() => handlePayment(true)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <CreditCard className="w-5 h-5" />
                  Pay with Credit Card
                </button>
                <button
                  onClick={() => handlePayment(true)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition-colors"
                >
                  Pay with PayPal
                </button>
                <button
                  onClick={() => handlePayment(false)}
                  className="w-full px-6 py-3 border border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Simulate Failed Payment
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Plan</span>
                  <span className="font-semibold text-slate-900">{selectedPlan.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold text-slate-900">{duration} {duration === 1 ? 'Year' : 'Years'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Payment Type</span>
                  <span className="font-semibold text-slate-900">{isSubscription ? 'Subscription' : 'One-time'}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 mb-6">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Base Price</span>
                    <span className="text-slate-900">${basePrice.toFixed(2)}</span>
                  </div>
                  {durationData.discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Duration Discount ({durationData.discount * 100}%)</span>
                      <span className="text-green-600">-${(basePrice * durationData.discount).toFixed(2)}</span>
                    </div>
                  )}
                  {isSubscription && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Subscription Discount (10%)</span>
                      <span className="text-green-600">-${(discountedPrice * 0.1).toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-slate-900">Total</span>
                  <span className="text-blue-600">${finalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-slate-900 mb-2">What's Included:</h3>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate('/pricing')}
                className="w-full px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Back to Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

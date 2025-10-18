import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { durations } from '../data/plans';
import { CheckCircle, Home } from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { selectedPlan, duration, isSubscription, billingInfo } = useSelector((state) => state.plan);

  if (!selectedPlan) {
    navigate('/pricing');
    return null;
  }

  const durationData = durations.find(d => d.years === duration);
  const basePrice = selectedPlan.basePrice * duration;
  const discountedPrice = basePrice * (1 - durationData.discount);
  const finalPrice = isSubscription ? discountedPrice * 0.9 : discountedPrice;
  const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
            <p className="text-lg text-slate-600">Thank you for your purchase</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Order ID</span>
                <span className="font-mono font-semibold text-slate-900">{orderId}</span>
              </div>
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
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-slate-600">Total Amount</span>
                <span className="text-2xl font-bold text-green-600">${finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {billingInfo.name && (
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Billing Information</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Name</span>
                  <span className="font-semibold text-slate-900">{billingInfo.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Email</span>
                  <span className="font-semibold text-slate-900">{billingInfo.email}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <p className="text-green-800 text-sm">
              A confirmation email has been sent to <strong>{billingInfo.email}</strong>.
              Please check your inbox for details about your purchase.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/pricing')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

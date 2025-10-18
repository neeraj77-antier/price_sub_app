import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, RotateCcw } from 'lucide-react';

export default function CancelPage() {
  const navigate = useNavigate();
  const { selectedPlan } = useSelector((state) => state.plan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Payment Canceled</h1>
            <p className="text-lg text-slate-600">Your payment was not processed</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">What happened?</h2>
            <p className="text-slate-600 mb-4">
              Your payment was canceled or failed to process. This could be due to:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Payment method declined or invalid</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Insufficient funds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>You chose to cancel the transaction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Network or connection issues</span>
              </li>
            </ul>
          </div>

          {selectedPlan && (
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Your Selected Plan</h2>
              <p className="text-slate-600 mb-4">
                Don't worry, your <strong>{selectedPlan.name}</strong> plan selection has been saved.
                You can retry the checkout process whenever you're ready.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/checkout')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Retry Checkout
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pricing
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

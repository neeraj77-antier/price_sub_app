import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedPlan, setDuration, setIsSubscription } from '../store/planSlice';
import { plans, durations } from '../data/plans';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [isSubscription, setIsSubscriptionState] = useState(true);

  const calculatePrice = (plan) => {
    const durationData = durations.find(d => d.years === selectedDuration);
    const basePrice = plan.basePrice * selectedDuration;
    const discountedPrice = basePrice * (1 - durationData.discount);
    return isSubscription ? discountedPrice * 0.9 : discountedPrice;
  };

  const handleProceedToCheckout = () => {
    const plan = plans.find(p => p.id === selectedPlanId);
    if (!plan) return;

    dispatch(setSelectedPlan(plan));
    dispatch(setDuration(selectedDuration));
    dispatch(setIsSubscription(isSubscription));
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-slate-600">Select the perfect plan for your needs</p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-slate-700">Duration:</label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(Number(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {durations.map((d) => (
                <option key={d.years} value={d.years}>
                  {d.years} {d.years === 1 ? 'Year' : 'Years'}
                  {d.discount > 0 && ` (${d.discount * 100}% off)`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-lg border border-slate-300">
            <span className={`text-sm font-medium ${!isSubscription ? 'text-slate-900' : 'text-slate-500'}`}>
              One-time
            </span>
            <button
              onClick={() => setIsSubscriptionState(!isSubscription)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isSubscription ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  isSubscription ? 'translate-x-7' : ''
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isSubscription ? 'text-slate-900' : 'text-slate-500'}`}>
              Subscription <span className="text-green-600">(10% off)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => {
            const price = calculatePrice(plan);
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative bg-white rounded-xl shadow-lg p-8 cursor-pointer transition-all hover:shadow-xl ${
                  isSelected ? 'ring-4 ring-blue-500 scale-105' : ''
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Selected
                  </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">${price.toFixed(0)}</span>
                  <span className="text-slate-600 ml-2">/ {selectedDuration} {selectedDuration === 1 ? 'year' : 'years'}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleProceedToCheckout}
            disabled={!selectedPlanId}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
              selectedPlanId
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

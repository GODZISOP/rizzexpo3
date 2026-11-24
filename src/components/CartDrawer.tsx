import { useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import type { AddToCartPayload } from './ProductShowcase';

export interface CartItem extends AddToCartPayload {
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (variantId: string, delta: number) => void;
  onRemove: (variantId: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 30;

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onClearCart,
}: CartDrawerProps) {
  const [checkedOut, setCheckedOut] = useState(false);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shippingCost = subtotal === 0 || remainingForFreeShipping === 0 ? 0 : 4.95;
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    setCheckedOut(true);
    onClearCart();
  };

  const handleClose = () => {
    setCheckedOut(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1B1712]/55 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <button
        type="button"
        aria-label="Close cart backdrop"
        onClick={handleClose}
        className="flex-1 cursor-default"
      />

      <div className="flex h-full w-full max-w-md flex-col bg-[#FBF7EE] text-[#1B1712] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E6DCC6] px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#9A6F1E]" />
            <h2 className="font-display text-lg font-extrabold">Your RIZZEXPO Bag</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2D6BC] bg-white text-[#1B1712] hover:bg-[#F3ECDC]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        {!checkedOut && (
          <div className="border-b border-[#E6DCC6] bg-white px-6 py-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#3D362C]">
              <Truck className="h-4 w-4 text-[#3E8227]" />
              {remainingForFreeShipping === 0 && subtotal > 0 ? (
                <span className="text-[#2E691D]">
                  You unlocked <strong>FREE Express 24h Shipping!</strong>
                </span>
              ) : (
                <span>
                  Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for FREE Express
                  Shipping
                </span>
              )}
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EFE7D6]">
              <div
                className="h-full rounded-full bg-[#4E9F3D] transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {checkedOut ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E4] text-[#3E8227]">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold">Order Confirmed!</h3>
              <p className="mt-2 max-w-xs text-sm text-[#5C5346]">
                Thank you for choosing RIZZEXPO Pet Care System. Your pack is queued to ship within
                24 hours.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 rounded-full bg-[#1B1712] px-7 py-3 text-sm font-bold text-white hover:bg-[#332B21]"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0E7D5] text-[#9A6F1E]">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-extrabold">Your bag is empty</h3>
              <p className="mt-1.5 max-w-xs text-sm text-[#5C5346]">
                Add our leak-proof eco waste bags or electrostatic pet hair remover to get started.
              </p>
              <a
                href="#products"
                onClick={handleClose}
                className="mt-5 rounded-full bg-[#F5C542] px-6 py-3 text-sm font-extrabold text-[#1B1712] hover:bg-[#FFD866]"
              >
                Browse Products
              </a>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.variantId}
                  className="flex gap-4 rounded-2xl border border-[#E7DEC9] bg-white p-3.5 shadow-sm"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#FAF8F4] p-1.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display text-sm font-extrabold text-[#1B1712]">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#6B6152]">{item.variantLabel}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.variantId)}
                        aria-label={`Remove ${item.name}`}
                        className="rounded-lg p-1 text-[#9A8F7D] hover:bg-[#F5EFE4] hover:text-[#1B1712]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-[#E2D6BC] bg-[#FBF7EE]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.variantId, -1)}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center text-[#1B1712] hover:text-[#9A6F1E]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-6 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.variantId, 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center text-[#1B1712] hover:text-[#9A6F1E]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-display text-sm font-extrabold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Totals */}
        {!checkedOut && items.length > 0 && (
          <div className="border-t border-[#E6DCC6] bg-white px-6 py-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#5C5346]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1B1712]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#5C5346]">
                <span>Shipping</span>
                <span className="font-semibold text-[#2E691D]">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#EFE7D6] pt-2.5 font-display text-base font-extrabold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-4 w-full rounded-full bg-[#1B1712] py-4 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#332B21] active:scale-[0.99]"
            >
              Checkout · ${total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

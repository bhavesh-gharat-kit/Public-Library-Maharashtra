import { toast } from "react-hot-toast";

const CustomConfirm = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  theme = "red",
}) => {
  if (!isOpen) return null;

  return toast(
    (t) => (
      <div>
        <p className="font-semibold">{message}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className={`px-3 py-1 bg-red-600 text-white rounded`}
            onClick={async () => {
              toast.dismiss(t.id);
              await onConfirm();
            }}
          >
            Confirm
          </button>
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => {
              toast.dismiss(t.id);
              onCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    { duration: Infinity, position: "top-center" }
  );
};
export default CustomConfirm;

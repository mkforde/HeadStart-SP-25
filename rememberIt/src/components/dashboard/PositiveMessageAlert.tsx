import { getRandomMessage } from "./messages";

interface MessageProps {
  onClose: () => void;
  name: string;
}

const PositiveMessageAlert: React.FC<MessageProps> = ({ onClose, name }) => {
  const message = getRandomMessage(name);

  return (
    <div className="toast toast-end toast-top w-60 shadow-lg">
      <div
        className="alert alert-info alert-soft cursor-pointer"
        onClick={onClose}
      >
        <div className="text-sm font-medium">{message}</div>
        <div className="text-xs text-base-content/60">Click to hide</div>
      </div>
    </div>
  );
};

export default PositiveMessageAlert;

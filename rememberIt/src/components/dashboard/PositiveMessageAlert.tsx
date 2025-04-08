import { getRandomMessage } from "./messages";

interface MessageProps {
  onClose: () => void;
  name: string;
}

const PositiveMessageAlert: React.FC<MessageProps> = ({ onClose, name }) => {
  const message = getRandomMessage(name);

  return (
    <div
      className="alert alert-success shadow-lg absolute top-4 right-20 w-80 z-50 cursor-pointer"
      onClick={onClose}
    >
      <div className="text-sm font-medium">{message}</div>
      <div className="text-xs text-base-content/60">Click to hide</div>
    </div>
  );
};

export default PositiveMessageAlert;

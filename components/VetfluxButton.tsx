import { MouseEventHandler } from "react";

export const VetfluxButton = ({ className, onClick, text, type, disabled = false }: { className?: string; text: string; onClick?: MouseEventHandler<HTMLButtonElement>; type: number; disabled?: boolean }) => {
  const typeByStyle = () => {
    switch (type) {
      case 0:
        return "text-white bg-primary min-w-[140px] px-6 py-3.5 border-2 border-primary hover:bg-primary-600 hover:border-primary-600 shadow-md ";
        break;
      case 1:
        return "text-primary bg-white min-w-[140px] px-6 py-3.5 border-2 border-primary hover:bg-primary hover:border-primary hover:text-white";
        break;
      case 2:
        return "bg-[#b0aebc] text-white px-6 py-4 hover:bg-primary";
        break;
      case 3:
        return "text-primary bg-white px-2 py-2 border border-primary hover:bg-primary hover:border-primary hover:text-white";
        break;
      case 4:
        return "text-trout bg-white px-2 py-2 border border-[#e9e9f0] shadow-sm hover:bg-white hover:border-primary hover:text-primary tracking-tighter";
        break;
      case 5:
        return "text-white bg-primary px-6 py-4 border-2 border-primary hover:bg-primary-600 rounded-full";
        break;
    }
  };
  return (
    <div className={className}>
      <button onClick={onClick} className={"inline-block w-full h-full leading-none transition rounded " + typeByStyle() + (disabled ? ` bg-[#b0aebc] border-[#b0aebc] hover:bg-[#b0aebc] hover:border-[#b0aebc] hover:cursor-not-allowed` : ``)} disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

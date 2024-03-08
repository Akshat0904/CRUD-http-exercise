/* eslint-disable react/prop-types */
const Button = ({ bgColor, children, onClick, ...props }) => {
  const color = bgColor;
  bgColor = `text-white font-Poppins h-[40px] font-medium font-semibold rounded-lg text-sm px-5 py-2.5  mb-2 ${color}`;

  return (
    <button type="button" className={bgColor} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;

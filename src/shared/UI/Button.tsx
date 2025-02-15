/**
 * Button Props Interface
 * @interface ButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Background color class from Tailwind */
  bgColor: string;
  /** Button content */
  children: React.ReactNode;
  /** Click handler function */
  onClick?: () => void;
}

/**
 * Reusable Button Component
 * @component Button
 * @description A customizable button component with Tailwind styling
 *
 * @example
 * ```tsx
 * <Button bgColor="bg-blue-700" onClick={() => handleClick()}>
 *   Click Me
 * </Button>
 * ```
 */
const Button: React.FC<ButtonProps> = ({
  bgColor,
  children,
  onClick,
  ...props
}) => {
  const color = bgColor;
  const buttonClass = `text-white font-Poppins h-[40px] font-medium font-semibold rounded-lg text-sm px-5 py-2.5 mb-2 ${color}`;

  return (
    <button type="button" className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;

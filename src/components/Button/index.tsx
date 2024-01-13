interface IButton {
  children?: any;
  className?: string;
  onClick?: () => void;
}

const Button = (props: IButton) => {
  return (
    <button
      class={`btn btn-primary ${props.className}`}
      onClick={() => {
        props.onClick && props.onClick();
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;

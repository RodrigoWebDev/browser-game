interface IModalContent {
  img?: string;
  text?: string;
}

const NpcTalk = (props: IModalContent) => {
  return (
    <div>
      {/* <div>{props.img && <img src={props.img} />}</div> */}
      <div>{props.text}</div>
    </div>
  );
};

export default NpcTalk;

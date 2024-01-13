interface Items {
  click: (index: number) => void;
  name: string;
}

interface IDropDown {
  items: Items[];
  buttonChildren: any;
  index: number;
}

const DropDown = ({ items, buttonChildren, index }: IDropDown) => {
  return (
    <details data-id="dropdown" class="dropdown mr-2">
      {/* @ts-ignore */}
      <summary class="m-1 btn">
        {/* <SwordsSvg className="w-[16px] text-white" /> */}
        {buttonChildren}
      </summary>
      <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {items.map((item) => {
          return (
            <li
              onClick={() => {
                item.click(index);
                /* console.log(e.target.getAttribute("data-id"));
                enemyTakeDamage(index, 10); */
              }}
            >
              <a data-id="action">{item.name}</a>
            </li>
          );
        })}

        <li>
          <a>Jogar item</a>
        </li>
      </ul>
    </details>
  );
};

export default DropDown;

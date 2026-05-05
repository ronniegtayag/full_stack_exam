// src/components/ItemSelector.tsx

import { useState } from "react";
import { ITEMS } from "../constant/items";

type Props = {
  onAdd: (itemId: string) => void;
};

export default function ItemSelector({ onAdd }: Props) {
  const [selected, setSelected] = useState("");

  return (
    <div>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select item</option>

        {ITEMS.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>

      <button
        style={{ marginLeft: "4px" }}
        onClick={() => {
          if (!selected) return;
          onAdd(selected);
          setSelected("");
        }}
      >
        Add
      </button>
    </div>
  );
}

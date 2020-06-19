import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const newInitialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(newInitialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data);
        window.location.reload()
      })
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res)
        window.location.reload()
      })
  };

  const handleNameChange = e => {
    e.preventDefault();
    setNewColor({
      ...newColor,
      color: e.target.value
    })
  }

  const handleCodeChange = e => {
    e.preventDefault();
    setNewColor({
      ...newColor,
      code: {
        hex: e.target.value
      }
    })
  }

  const addNewColor = e => {
    e.preventDefault()
    axiosWithAuth().post('/api/colors', newColor)
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <div>
        <form onSubmit={addNewColor}>
          <label>New Color</label>
          <input
            type="text"
            name="color"
            value={newColor.color}
            onChange={handleNameChange}
          />
          <label>Hex Code</label>
          <input
            type="text"
            name="code.hex"
            value={newColor.code.hex}
            onChange={handleCodeChange}
          />
          <button type="submit">Submit</button>
        </form>
        </div>
    </div>
  );
};

export default ColorList;

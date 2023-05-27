import EditableImage from "./EditableImage";

export default function Cover({ src, onChange, editable }) {
  return (
    <EditableImage
      src={src}
      type={'cover'}
      editable={editable}
      onChange={onChange}
      className={"h-36"}
    />
  );
}

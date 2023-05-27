import EditableImage from "./EditableImage";

export default function Avatar({ src, big, onChange, editable = false }) {
  const widthClass = big ? "w-24" : "w-12";

  return (
    <div>
      <EditableImage
        src={src}
        type={'image'}
        onChange={onChange}
        editable={editable}
        className={"rounded-full overflow-hidden " + widthClass}
      />
    </div>
  );
}

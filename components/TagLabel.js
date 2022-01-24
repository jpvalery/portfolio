const TagLabel = (props) => {
  return (
    <li
      key={props.slug}
      className="rounded-sm bg-gray-800 px-2.5 py-1.5 text-sm uppercase text-gray-200"
    >
      {props.title}
    </li>
  )
}

export default TagLabel

//   slug={tag.slug}
//   title={tag.title}

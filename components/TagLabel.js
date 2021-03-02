const TagLabel = (props) => {
  return (
    <li
      key={props.slug}
      className="uppercase text-gray-200 bg-gray-800 text-sm rounded-sm px-2.5 py-1.5"
    >
      {props.title}
    </li>
  )
}

export default TagLabel

//   slug={tag.slug}
//   title={tag.title}

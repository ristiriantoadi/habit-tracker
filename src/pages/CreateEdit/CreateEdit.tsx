interface Props{
    title:string
}


function CreateEdit({title}:Props) {
  return (
    <div>
        <h1>{title}</h1>
    </div>
  )
}

export default CreateEdit
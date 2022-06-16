import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const ProductCount = ({ countFunc }) => {
  const [count, setCount] = useState(1);
//   const [controlCount, setControlCount] = useState(0);
//   const [countBool, setCountBool] = useState(true);

  useEffect(() => {
    countFunc(count);
  }, [count]);

//   const control = (value)=>{
//     setControlCount(count)
//     console.log(count);
//     setCount(value)
//     (controlCount < count) ? setCountBool(false) : setCountBool(true)
//   }

  return (
    // <InputGroup className="">
    //     <Button disabled = {count === 0} onClick={e=> {setCount(()=> count - 1); setCountBool(false)}} variant="warning">-</Button>
    //     <FormControl style={{textAlign:'center'}} readOnly = {true} value={count} aria-label="Example text with two button addons" />
    //     <Button onClick={e=> {setCount(()=> count + 1); setCountBool(true)}} variant="warning">+</Button>

    // </InputGroup>
    <Form.Select aria-label="Default select example" onChange={e=> setCount(e.target.value)}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </Form.Select>
  );
};

export default ProductCount;

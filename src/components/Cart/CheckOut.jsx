import classes from './CheckOut.module.css';

import react, {useRef, useState} from 'react';

const hasText = (value) => value.trim() !== '';

const hasFiveChars = (value) => value.trim().length >= 5;

const Checkout = ({onConfirm, onCancel}) => {
  const [fromInputsValidity, setFromInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef(null);
  const streetInputRef = useRef(null);
  const postalInputRef = useRef(null);
  const cityInputRef = useRef(null);

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    setFromInputsValidity({
      name: hasText(enteredName),
      street: hasText(enteredStreet),
      city: hasText(enteredCity),
      postalCode: hasText(enteredPostal) && hasFiveChars(enteredPostal),
    });

    const formIsValid = ![enteredName, enteredStreet, enteredPostal, enteredCity]
      .map((el, idx) => {
        if (!idx === 3) return hasText(el);
        return hasFiveChars(el) && hasText(el);
      })
      .includes(false);

    if (!formIsValid) return;

    onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal,
    });
  };

  return (
    <>
      <h3>Please fill in the order details:</h3>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${fromInputsValidity.name ? '' : classes.invalid}`}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!fromInputsValidity.name && <p>Name is not valid!</p>}
        </div>
        <div className={`${classes.control} ${fromInputsValidity.street ? '' : classes.invalid}`}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!fromInputsValidity.street && <p>Street name is not valid!</p>}
        </div>
        <div className={`${classes.control} ${fromInputsValidity.postalCode ? '' : classes.invalid}`}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalInputRef} />
          {!fromInputsValidity.postalCode && <p>Postal Code is not valid!</p>}
        </div>
        <div className={`${classes.control} ${fromInputsValidity.city ? '' : classes.invalid}`}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!fromInputsValidity.city && <p>City name is not valid!</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </>
  );
};

export default Checkout;

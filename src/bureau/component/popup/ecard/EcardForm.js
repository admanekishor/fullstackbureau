import { useEffect, useState } from 'react';
import bureau from '../../../../assets/css/Custom.module.css';
import { useForm } from "react-hook-form";
import emailjs from 'emailjs-com';
import { Icon } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

let EcardForm = ({ setShowPopup }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onError = (errors, e) => {
    console.log(errors)
  };


  const [Thanku, setThanku] = useState("inactive")


  useEffect(() => {
    setTimeout(() => {
      // reset();
      setThanku("inactive");
    }, 3000);
  }, [Thanku])

  const resetForm = () => {

    setThanku("active");
  };
  const sendmail = (data, e) => {
    console.log(data);
    emailjs.sendForm(
      'service_iy8f8a4',
      'template_v4nqmqm',
      e.target,
      'user_7fnUcS4f0h9fPp2uyoV4N'
    ).then(res => {
      if (res.status === 200) {
        setThanku("active");
        resetForm();
        console.log(res);
      }

    }).catch(err => console.log(err));

  };

  return (


    <Grid container rowSpacing={1} justifyContent="center">
      <Grid item xs={12}>
        <div style={{ padding: '50px 0px' }} className={Thanku === 'active' ? "active" : "inactive"}>
          <h2>Your Mail has been Sent. Our Team will contact you soon!</h2>
          <div><Icon color="green" name="thumbs up" size="huge" /></div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(sendmail, onError)} className={Thanku !== 'active' ? "active" : "inactive"} method="post">
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <div>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Your Name"
                  variant="outlined"
                  error={errors.Name}
                  {...register('Name', { required: true, maxLength: 30 })}
                />
                {/* {errors.Name && <div style={{ color: 'red', textAlign: 'left' }}>required*</div>} */}
                {errors.Name && errors.Name.type === "required" && (
                  <div style={{ color: 'red', textAlign: 'left' }}>required*</div>
                )}
                {errors.Name && errors.Name.type === "maxLength" && (
                  <div style={{ color: 'red', textAlign: 'left' }}>maxLength exceeded*</div>
                )}

              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={errors.Phone}
                  {...register('Phone', {
                    required: true,
                    pattern: /^[+-]?\d*(?:[.,]\d*)?$/,
                    minLength: 10,
                    maxLength: 12
                  })}
                />
                {errors.Phone && errors.Phone.type === "pattern" && (
                  // <span role="alert">Max length exceeded</span>
                  <div style={{ color: 'red', textAlign: 'left' }}>enter Only Digits*</div>
                )}
                {errors.Phone && errors.Phone.type === "required" && (
                  <div style={{ color: 'red', textAlign: 'left' }}>required*</div>
                )}
                {errors.Phone && errors.Phone.type === "minLength" && (
                  // <span role="alert">Max length exceeded</span>
                  <div style={{ color: 'red', textAlign: 'left' }}>Min length exceeded*</div>
                )}
                {errors.Phone && errors.Phone.type === "maxLength" && (
                  // <span role="alert">Max length exceeded</span>
                  <div style={{ color: 'red', textAlign: 'left' }}>Max length exceeded*</div>
                )}
              </div>
            </Grid>


            <Grid item xs={12} justifyContent="flex-end" display="flex">
              <Button variant="contained" color="secondary" className="buttontheme" size="medium" sx={{ mx: 2 }} onClick={() => { setShowPopup(false) }}>Cancel</Button>
              <Button variant="contained" color="secondary" className="buttontheme" size="medium" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>



  )
}
export default EcardForm;
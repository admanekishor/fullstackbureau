import { useEffect, useState } from 'react';
import bureau from '../assets/css/Custom.module.css';
import { useForm } from "react-hook-form";
import emailjs from 'emailjs-com';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

let ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const onError = (errors, e) => {
    console.log(errors)
  };

  const [status, setStatus] = useState("active");
  const [Thanku, setThanku] = useState("inactive")

  useEffect(() => {
    setTimeout(() => {
      setStatus("active");
      setThanku("inactive");
    }, 3000);
  })
  const resetForm = () => {
    reset();
    setStatus("inactive");
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
      if (res.status == 200) {
        resetForm();
        console.log(res);
      }

    }).catch(err => console.log(err));

  };

  return (


    <Grid container rowSpacing={1} justifyContent="center">
      <Grid item xs={12}>
        <div style={{ padding: '50px 0px' }} className={Thanku ? `${bureau.inactive}` : `${bureau.active}`}>
          <h2>Your Mail has been Sent. Our Team will contact you soon!</h2>
          <div><Icon color="green" name="thumbs up" size="huge" /></div>
        </div>
      </Grid>
      <Grid item xs={8}>
        <form onSubmit={handleSubmit(sendmail, onError)} className={status} method="post">
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <div>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Your Name"
                  error
                  variant="outlined" err={errors.Name}
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
            <Grid item xs={6}>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  fullWidth
                  size="small"
                  error
                  variant="outlined"
                  err={errors.Phone}
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
            <Grid item xs={6}>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Your Email Id"
                  fullWidth
                  size="small"
                  error
                  variant="outlined"
                  err={errors.email}
                  {...register('email', {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <div style={{ color: 'red', textAlign: 'left' }}>required*</div>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <div style={{ color: 'red', textAlign: 'left' }}>Email format is wrong</div>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Subject"
                  fullWidth
                  size="small"
                  error
                  variant="outlined"
                  err={errors.subject}
                  {...register('subject', {
                    required: true,
                    maxLength: 60,
                    pattern: /[A-Za-z]/,
                  })}
                />
                {errors.subject && errors.subject.type === "required" && (
                  <div style={{ color: 'red', textAlign: 'left' }}>required*</div>
                )}
                {errors.subject && errors.subject.type === "pattern" && (
                  <div style={{ color: 'red', textAlign: 'left' }}>Enter Letters only*</div>
                )}
                {errors.subject && errors.subject.type === "maxLength" && (
                  <div style={{ color: 'red', textAlign: 'left' }}>maxLength exceeded</div>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              
                <TextField
                fullWidth
                  label="message"
                  multiline
                  error={errors.message}
                  rows={2}
                  rowsMax={4}
                  {...register('message', {
                    required: true,
                    maxLength: 150,
                  })}
                />
                {/* <textarea className="contact-textarea" name="message" id="w3lMessage"
                  placeholder="Type your message here"
                  error={errors.message}

                  // aria-invalid={errors.w3lMessage ? "true" : "false"}
                  {...register('message', {
                    required: true,
                    maxLength: 150,
                  })} ></textarea> */}
                {errors.message && errors.message.type === "required" && (
                  <div style={{ color: 'red', textAlign: 'left' }}>required*</div>
                )}
                {errors.message && errors.message.type === "maxLength" && (
                  <div style={{ color: 'red', textAlign: 'left' }}>maxLength exceeded*</div>
                )}
              
            </Grid>
            <Grid item xs={12} justifyContent="flex-end" display="flex"> 
            <Button variant="outlined" color="error" size="large" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>



  )
}
export default ContactForm;
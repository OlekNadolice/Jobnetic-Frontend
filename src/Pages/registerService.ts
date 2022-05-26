function validateEmail(value: any) {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/emailVerification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
  });
}

export default validateEmail;

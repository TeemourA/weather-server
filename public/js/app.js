fetch('http://localhost:3000/weather?address=Moscow')
  .then((res) => res.json())
  .then((data) => console.log(data));

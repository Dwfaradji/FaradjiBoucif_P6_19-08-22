 export default async function data() {
	try {
	  const response = await fetch("../../data/photographers.json");
	  const promise = await response.json();
	  return promise;
	} catch (error) {
	  console.log(error);
	}
  }
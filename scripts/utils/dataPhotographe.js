// scripts/utils/photographers.json
export default async function data() {
    const response = await fetch("data/photographers.json");
    const promise = await response.json();
    return promise;
}

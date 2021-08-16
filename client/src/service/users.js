/*=================================
           Write to data
=================================*/

const add = async (url, userInfo) => {
  const res = await fetch("http://localhost:27017/" + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const res2 = await res.text();
  return res2;
};

const update = async (url, userInfo) => {
  const res = await fetch("http://localhost:27017/" + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const res2 = await res.text();
  return res2;
};


const deleteItem = async (url) => {
  const res = await fetch("http://localhost:27017/" + url, {
    method: "DELETE"  
  })
  const res2 = await res.text();
  return res2;
}

const deleteItemData = async (url,data) => {
  const res = await fetch("http://localhost:27017/" + url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const res2 = await res.text();
  return res2;
}

/*=================================
           Read  data
=================================*/

async function getAll(url) {
  let response = await fetch("http://localhost:27017/" + url);
  let data = await response.json();
  return data;
}

async function get(url) {
  let response = await fetch("http://localhost:27017/" + url);
  let data = await response.json();
  return data;
}

export { add, update, getAll, deleteItem, get,deleteItemData };

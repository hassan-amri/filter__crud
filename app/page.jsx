"use client";
import { useEffect, useState } from "react";
import "./page.css";
import { PrismaClient } from "@prisma/client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircleIcon from "@mui/icons-material/Circle";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // filter fields
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  // const [active, setActive] = useState(1);

  const [arr, setArr] = useState([]);

  // filter form
  const [filter, isFilter] = useState(true);
  const [filterCount, setFilterCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  // insert form
  const [insertCount, setInsertCount] = useState(0);

  //deleting client
  const [message, setMessage] = useState("");

  // update client
  const [clickCount, setClickCount] = useState(0);

  // switch toggle icons
  const [active, setActive] = useState(1);
  // switch toggle in add form
  const [toggle, setToggle] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("/api/clients"); // Replace with your actual API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log(jsonData);

        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
      console.log("data", data);
      
       
      
    };

    fetchData();
    
  }, []);

  //handleToggle
  const handleToggle = () => {
    if (toggle === false) {
      setToggle(true);
      console.log(toggle);
    }
    if (toggle === true) {
      setToggle(false);
      console.log(toggle);
    }
  };

  // handle search
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // handle filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "code") {
      setCode(value);
    }
    if (name === "name") {
      setName(value);
    }
    if (name === "address") {
      setAddress(value);
    }
    if (name === "city") {
      setCity(value);
    }
    if (name === "country") {
      setCountry(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    // if (name === "active") {
    //   setActive(parseInt(value));
    // }
  };

  //handle insert
  const handleInsert = async (e) => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/clients"); // Replace with your actual API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();

        setData(jsonData);
        console.log("inserted data", data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setInsertCount(insertCount + 1);
    console.log(insertCount);
    if (insertCount === 0) {
      document.querySelector(".insert__form").style.display = "block";
    }
    if (insertCount === 1) {
      try {
        const response = await fetch("/api/addClient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            name,
            address,
            city,
            country,
            email,
            toggle,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add customer");
        }

        setSuccess(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      setInsertCount(0);
      console.log("hassan");
      document.querySelector(".insert__form").style.display = "none";

      const fetchData = async () => {
        try {
          const response = await fetch("/api/clients"); // Replace with your actual API route
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();

          setData(jsonData);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      // clear the input fields right after inserting and fetching data
      document.querySelectorAll(".inputField").forEach((inputField) => {
        inputField.value = "";
      });

      setCode("");
      setName("");
      setAddress("");
      setCity("");
      setCountry("");
      setEmail("");
    }
  };

  //handle filter

  const handleFilter = async () => {
    console.log(filterCount);
    // document.querySelectorAll(".filteredData").forEach((dt) => {
    //   dt.style.display = "none";
    // });
    // document.querySelectorAll(".actualDataTR").forEach((dt) => {
    //   dt.style.display = "block";
    // });
    // document.querySelector(".searchInput").value = "";

    setFilterCount(filterCount + 1);
    console.log(filterCount);
    if (filterCount === 0) {
      document.querySelector(".filter__form").style.display = "block";
      arr.splice(0, arr.length);

      const fetchData = async () => {
        try {
          const response = await fetch("/api/clients"); // Replace with your actual API route
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();
  
          setData(jsonData);
          console.log("inserted data", data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }

    if (filterCount === 1) {
      console.log("this is data", data);
      data.map((client) => {
        if (client.code.includes(searchValue)) {
          arr.push(client);
        } else if (client.name.includes(searchValue)) {
          arr.push(client);
        } else if (client.address.includes(searchValue)) {
          arr.push(client);
        } else if (client.city.includes(searchValue)) {
          arr.push(client);
        } else if (client.country.includes(searchValue)) {
          arr.push(client);
        } else if (client.mail.includes(searchValue)) {
          arr.push(client);
        } else {
          return;
        }
      });

      document.querySelectorAll(".actualDataTR").forEach((dt) => {
        dt.style.display = "none";
      });
      document.querySelectorAll(".filteredData").forEach((dt) => {
        dt.style.display = "block";
      });

      //

      console.log("after", arr);

      document.querySelector(".filter__form").style.display = "none";
      setFilterCount(2);
      document.querySelector(".searchInput").value = "";
    }
    if(filterCount===2){
      window.location.reload();

     
     


    }
  };

  // handle delete
  const handleDelete = async (clientId) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch("/api/deleteClient", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: clientId }),
        });

        // const data = await response.json();

        if (response.ok) {
          window.location.reload();
          //     const fetchData = async () => {
          //   try {
          //     const response = await fetch("/api/clients"); // Replace with your actual API route
          //     if (!response.ok) {
          //       throw new Error("Failed to fetch data");
          //     }
          //     const jsonData = await response.json();

          //     setData(jsonData);
          //   } catch (error) {
          //     setError(error);
          //   } finally {
          //     setLoading(false);
          //   }
          // };

          // fetchData();
          // Additional actions after successful deletion
        } else {
          //  setMessage('Failed to delete customer. Error: ' + data.error);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred while deleting customer.");
      }
    } else {
      // Code to cancel the deletion
      alert("Deletion cancelled.");
    }
  };

  //handle update
  const handleUpdate = async (clientId, indexId) => {
    // setUpdateButtonText(true);

    setClickCount((prevCount) => prevCount + 1);
    console.log(clickCount);

    document.querySelectorAll("input[data-client-id]").forEach(function (item) {
      item.setAttribute("readOnly", true);
      item.style.backgroundColor = "transparent";
      item.style.border = "none";
      if (item.dataset.clientId === clientId.toString()) {
        item.removeAttribute("readonly");
        item.style.backgroundColor = "white";
        item.style.border = "1px solid red";
      }
    });

    // write a code for updating customers infos

    if (clickCount === 1) {
      console.log(name);
      try {
        const response = await fetch("/api/updateClient", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: clientId,
            code,
            name,
            address,
            city,
            country,
            email,
          }), // Include the id
        });

        if (!response.ok) {
          throw new Error("Failed to update customer");
        }

        // setSuccess(true);
      } catch (error) {
        // setError(error.message);
        console.log("this is error message " + error.message);
      } finally {
        // setLoading(false);
      }
      // window.location.reload();
      setClickCount(0);
      const fetchData = async () => {
        try {
          const response = await fetch("/api/clients"); // Replace with your actual API route
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();

          setData(jsonData);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      document
        .querySelectorAll("input[data-client-id]")
        .forEach(function (item) {
          item.setAttribute("readOnly", true);
          item.style.backgroundColor = "transparent";
          item.style.border = "none";
        });
    }

    // console.log(customerId);
  };

  const [success, setSuccess] = useState(false);

  return (
    <div>
      <h1>List of Clients : [{data.length}]</h1>

      <div className="alert__area">please enter all the information</div>

      <div className="filter__form">
        <input
          type="text"
          placeholder="Search..."
          className="searchInput"
          defaultValue={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="title__bottom">
        <div className="insert__form">
          <input
            type="text"
            placeholder="Code..."
            className="inputField"
            defaultValue={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name..."
            className="inputField"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address..."
            className="inputField"
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City..."
            className="inputField"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country..."
            className="inputField"
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email..."
            className="inputField"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {toggle ? (
            <ToggleOnIcon className="toggleOn" onClick={() => handleToggle()} />
          ) : (
            <ToggleOffIcon
              className="toggleOff"
              onClick={() => handleToggle()}
            />
          )}
        </div>
      </div>

      <button type="button" className="btn btn-primary" onClick={handleFilter}>
        Filter
      </button>
      <button type="button" className="btn btn-success" onClick={handleInsert}>
        New
      </button>

      <table id="table" className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Code</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th scope="col">Mail</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((cl, index) => (
            <tr className="filteredData" key={index}>
              <td>
                {" "}
                <input
                  type="text"
                  data-client-id={cl.id}
                  readOnly
                  defaultValue={cl.id}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                  data-client-id={cl.id}
                  readOnly
                  defaultValue={cl.code}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  data-client-id={cl.id}
                  readOnly
                  defaultValue={cl.name}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  data-client-id={cl.id}
                  readOnly
                  defaultValue={cl.address}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                  data-client-id={cl.id}
                  readOnly
                  defaultValue={cl.city}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  onChange={(e) => setCountry(e.target.value)}
                  data-client-id={cl.id}
                  readOnly
                  defaultValue={cl.country}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  data-client-id={cl.id}
                  readOnly
                  defaultValue={cl.mail}
                />
              </td>
              <td className="iconsTd">
                <DeleteIcon
                  className="deleteIcon"
                  onClick={() => handleDelete(cl.id)}
                />
                <EditIcon
                  className="updateIcon"
                  onClick={() => handleUpdate(cl.id, index)}
                />
                {cl.active ? (
                  <CircleIcon className="activeIcon" />
                ) : (
                  <CircleIcon className="non-activeIcon" />
                )}
              </td>
            </tr>
          ))}
          {data.map((user, index) => (
            // for pagination we add .slice(0,5) right after data (between data and map)
            <tr className="actualDataTR" key={index}>
              {/* <th scope="row">{index + 1}</th> */}

              <td className="idTd">
                <input
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                  data-client-id={user.id}
                  readOnly
                  defaultValue={user.id}
                />
              </td>

              <td>
                <input
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                  data-client-id={user.id}
                  readOnly
                  defaultValue={user.code}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  data-client-id={user.id}
                  readOnly
                  defaultValue={user.name}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  data-client-id={user.id}
                  readOnly
                  defaultValue={user.address}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                  data-client-id={user.id}
                  readOnly
                  defaultValue={user.city}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setCountry(e.target.value)}
                  data-client-id={user.id}
                  readOnly
                  defaultValue={user.country}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  data-client-id={user.id}
                  readOnly
                  defaultValue={user.mail}
                />
              </td>
              <td className="iconsTd">
                <DeleteIcon
                  className="deleteIcon"
                  onClick={() => handleDelete(user.id)}
                />
                <EditIcon
                  className="updateIcon"
                  onClick={() => handleUpdate(user.id, index)}
                />
                {user.active ? (
                  <CircleIcon className="activeIcon" />
                ) : (
                  <CircleIcon className="non-activeIcon" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

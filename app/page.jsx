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
import { DataArray } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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

  // pagination
  const [pageNumber, setPageNumber] = useState(1);

  // switch toggle icons
  const [active, setActive] = useState(1);
  // switch toggle in add form
  const [toggle, setToggle] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");

  const [isControlled, setIsControlled] = useState(true);

  const [dataCount, setDataCount] = useState();

  useEffect(() => {
    localStorage.setItem("lastPage", '1');
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
    const fetchDataCount = async () => {
      try {
        const response = await fetch("/api/getClientsCount"); // Replace with your actual API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("data count : ", jsonData);

        setDataCount(jsonData);
        console.log("data count hhhh : ", dataCount);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataCount();
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
      setDataCount(dataCount + 1);
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
    setFilterCount(filterCount + 1);
    console.log(filterCount);
    if (filterCount === 0) {
      document.querySelector(".filter__form").style.display = "block";
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
    }

    if (filterCount === 1) {
      const filtered = data.filter((client) => {
        if (filterCategory === "all") {
          return (
            (client.code &&
              client.code.toLowerCase().includes(searchValue.toLowerCase())) ||
            (client.name &&
              client.name.toLowerCase().includes(searchValue.toLowerCase())) ||
            (client.address &&
              client.address
                .toLowerCase()
                .includes(searchValue.toLowerCase())) ||
            (client.city &&
              client.city.toLowerCase().includes(searchValue.toLowerCase())) ||
            (client.country &&
              client.country
                .toLowerCase()
                .includes(searchValue.toLowerCase())) ||
            (client.email &&
              client.email.toLowerCase().includes(searchValue.toLowerCase()))
          );
        } else {
          return (
            client[filterCategory] &&
            client[filterCategory]
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          );
        }
      });

      console.log(filtered);
      setData(filtered);
      console.log(data);
      document.querySelector(".filter__form").style.display = "none";
      setFilterCount(0);
      document.querySelector(".searchInput").value = "";
      setFilterCategory("all");
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
          setDataCount(dataCount - 1);
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
      setIsControlled(false);
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

  //handle pagination
  const handlePagination = (clickedNumber) => {
    window.scrollTo(0, 0);
    const getStorage = localStorage.getItem('lastPage');
    console.log(clickedNumber);

    if(clickedNumber === 'Previous'){
      if(getStorage ==='2'){
        localStorage.setItem('lastPage', '1');
        const fetchData = async () => {
          try {
            const response = await fetch("/api/clients"); // Replace with your actual API route
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();

            return setData(jsonData.slice(0, 10));
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };

        fetchData();

      }
      if(getStorage ==='3'){
        localStorage.setItem('lastPage', '2');
        const fetchData = async () => {
          try {
            const response = await fetch("/api/clients"); // Replace with your actual API route
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();

            return setData(jsonData.slice(10, 20));
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };

        fetchData();

      }

    }

    if(clickedNumber === 'Next'){
      if(getStorage ==='1'){
        localStorage.setItem('lastPage', '2');
        const fetchData = async () => {
          try {
            const response = await fetch("/api/clients"); // Replace with your actual API route
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();

            return setData(jsonData.slice(10, 20));
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };

        fetchData();

      }
      if(getStorage ==='2'){
        localStorage.setItem('lastPage', '3');
        const fetchData = async () => {
          try {
            const response = await fetch("/api/clients"); // Replace with your actual API route
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();

            return setData(jsonData.slice(20, 30));
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };

        fetchData();

      }

    }

    

    if (Number(clickedNumber) === 1) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/clients"); // Replace with your actual API route
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();

          return setData(jsonData.slice(0, 10));
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      localStorage.setItem('lastPage', clickedNumber);
    }
    if (Number(clickedNumber) === 2) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/clients"); // Replace with your actual API route
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();

          return setData(jsonData.slice(10, 20));
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      localStorage.setItem('lastPage', clickedNumber);
    }
    if (Number(clickedNumber) === 3) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/clients"); // Replace with your actual API route
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();

          return setData(jsonData.slice(20, 30));
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      localStorage.setItem('lastPage', clickedNumber);
    }
  };

  

  

  const [success, setSuccess] = useState(false);

  return (
    <div className="content">
      <h1 className="listTitle">List of Clients : [{dataCount}]</h1>

      <span className="buttons">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleFilter}
        >
          Filter
        </button>
        <br />
        <button
          type="button"
          className="btn btn-success"
          onClick={handleInsert}
        >
          New
        </button>
      </span>
      <div className="filter__form">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="code">Code</option>
          <option value="name">Name</option>
          <option value="address">Address</option>
          <option value="city">City</option>
          <option value="country">Country</option>
          <option value="email">Email</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="searchInput"
          defaultValue={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <span className="insert__form">
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
          <div>
            <span className="activeWord">Active :</span>{" "}
            <ToggleOnIcon className="toggleOn" onClick={() => handleToggle()} />
          </div>
        ) : (
          <div>
            <span className="activeWord">Active :</span>{" "}
            <ToggleOffIcon
              className="toggleOff"
              onClick={() => handleToggle()}
            />
          </div>
        )}
      </span>

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
          {data.slice(0, 10).map((user, index) => (
            <tr key={index}>
              <td className="idTd">
                <input
                  type="text"
                  readOnly
                  data-client-id={user.id}
                  value={user.id}
                />
              </td>
              <td>
                {isControlled ? (
                  <input
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    readOnly
                    data-client-id={user.id}
                    value={user.code}
                  />
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    data-client-id={user.id}
                    defaultValue={user.code}
                  />
                )}
              </td>
              <td>
                {isControlled ? (
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    readOnly
                    data-client-id={user.id}
                    value={user.name}
                  />
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    data-client-id={user.id}
                    defaultValue={user.name}
                  />
                )}
              </td>
              <td>
                {isControlled ? (
                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    readOnly
                    data-client-id={user.id}
                    value={user.address}
                  />
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    data-client-id={user.id}
                    defaultValue={user.address}
                  />
                )}
              </td>
              <td>
                {isControlled ? (
                  <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    readOnly
                    data-client-id={user.id}
                    value={user.city}
                  />
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    data-client-id={user.id}
                    defaultValue={user.city}
                  />
                )}
              </td>
              <td>
                {isControlled ? (
                  <input
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                    readOnly
                    data-client-id={user.id}
                    value={user.country}
                  />
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                    data-client-id={user.id}
                    defaultValue={user.country}
                  />
                )}
              </td>
              <td>
                {isControlled ? (
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                    data-client-id={user.id}
                    value={user.mail}
                  />
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    data-client-id={user.id}
                    defaultValue={user.mail}
                  />
                )}
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
          <li
            className="page-item"
            onClick={(e) => handlePagination(e.target.textContent)}
          >
            Previous
          </li>
          <li
            className="page-item"
            onClick={(e) => handlePagination(e.target.textContent)}
          >
            1
            
          </li>
          <li
            className="page-item"
            onClick={(e) => handlePagination(e.target.textContent)}
          >
            2
          </li>
          <li
            className="page-item"
            onClick={(e) => handlePagination(e.target.textContent)}
          >
            3
          </li>
          <li
            className="page-item"
            onClick={(e) => handlePagination(e.target.textContent)}
          >
            Next
          </li>
        </ul>
      </nav>
      <Link href="/about">go to about</Link>
    </div>
  );
}

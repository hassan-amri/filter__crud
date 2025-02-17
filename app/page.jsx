"use client";
import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import "./page.css";
import "table2excel";
import * as XLSX from "xlsx";

import CheckIcon from "@mui/icons-material/Check"; //check icon
import { PrismaClient } from "@prisma/client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircleIcon from "@mui/icons-material/Circle";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Link from "next/link";
import { DataArray } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import PaginationControls from "./PaginationControls";
import Header from "./Header";

export default function Home({ searchParams }) {
  // reports states

  const [r__message, setRmessage] = useState("");
  const tableRef = useRef(null);
  const [isModal, setIsModal] = useState(true);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newTr, setNewTr] = useState(false);

  const targetRef = useRef(null);

  const [startPage, setStartPage] = useState(false);

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

  const [filterCode, setFilterCode] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterAddress, setFilterAddress] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  // insert form
  const [insertCount, setInsertCount] = useState(0);

  const [addedTr, setAddedTr] = useState(false);

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

  const datas = [
    "entry 1",
    "entry 2",
    "entry 3",
    "entry 4",
    "entry 5",
    "entry 6",
    "entry 7",
    "entry 8",
    "entry 9",
    "entry 10",
    "entry 11",
    "entry 12",
    "entry 13",
    "entry 14",
    "entry 15",
  ];

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const entries = datas.slice(start, end);

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

  // scrolling action useEffect
  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is greater than 500 pixels
      if (window.scrollY > 160) {
        // alert("hassan");
        document.querySelector("#table thead tr").style.position = "sticky";
        document.querySelector("#table thead tr").style.top = "0";
        document.querySelector("#table thead tr").style.width =
          "100vw !important";
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    localStorage.setItem("lastPage", "1");
    const fetchData = async () => {
      try {
        const response = await fetch("/api/clients"); // Replace with your actual API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("json : ", jsonData);

        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
      console.log("data", data);
    };

    fetchData();

    fetchDataCount();
  }, []);

  // get reports

  const [reports, setReports] = useState([]);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/getReports"); // Replace with your actual API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log(jsonData);

        setReports(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
      console.log("reports :", reports);
    };

    fetchReports();
  }, []);

  // useEffect for filter inputs
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

  // useEffect(() => {
  //   const filterData = data.filter((client) => {
  //     if (
  //       client.code.toLowerCase().includes(filterCode.toLowerCase()) &&
  //       client.name.toLowerCase().includes(filterName.toLowerCase()) &&
  //       client.address.toLowerCase().includes(filterAddress.toLowerCase()) &&
  //       client.city.toLowerCase().includes(filterCity.toLowerCase()) &&
  //       client.country.toLowerCase().includes(filterCountry.toLowerCase()) &&
  //       client.mail.toLowerCase().includes(filterEmail.toLowerCase())
  //     ) {
  //       return client;
  //     }
  //   });

  //   setData(filterData);

  //   setStartPage(true)

  //   setDataCount(filterData.length);
  //   setPageNumber(1)
  // }, [
  //   filterCode,
  //   filterName,
  //   filterAddress,
  //   filterCity,
  //   filterCountry,
  //   filterEmail,
  // ]);

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

  //add client using Enter keypress

  // const textInput = document.querySelectorAll('.inputField');
  // textInput.forEach(txt=>{
  //   txt.addEventListener('keydown', (event) => {
  //   if (event.key === 'Enter') {
  //     // alert('Enter key pressed!');
  //     // Perform desired actions here
  //     if(code !== "" || name !== "" || address !== "" || city !== "" || country !== "" || email !== ""){
  //       try {
  //         const response =  fetch("/api/addClient", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             code,
  //             name,
  //             address,
  //             city,
  //             country,
  //             email,
  //             toggle,
  //           }),
  //         });

  //         if (!response.ok) {
  //           throw new Error("Failed to add customer");
  //         }

  //         setSuccess(true);
  //       } catch (error) {
  //         setError(error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //       setDataCount(dataCount + 1);
  //       setInsertCount(0);
  //       console.log("hassan");
  //       document.querySelector(".insert__form").style.display = "none";

  //       const fetchData = async () => {
  //         try {
  //           const response = await fetch("/api/clients"); // Replace with your actual API route
  //           if (!response.ok) {
  //             throw new Error("Failed to fetch data");
  //           }
  //           const jsonData = await response.json();

  //           setData(jsonData);
  //         } catch (error) {
  //           setError(error);
  //         } finally {
  //           setLoading(false);
  //         }
  //       };

  //       fetchData();

  //       // clear the input fields right after inserting and fetching data
  //       document.querySelectorAll(".inputField").forEach((inputField) => {
  //         inputField.value = "";
  //       });

  //       setCode("");
  //       setName("");
  //       setAddress("");
  //       setCity("");
  //       setCountry("");
  //       setEmail("");

  //       document.querySelector(".newBtn").textContent = "New";
  //       setInsertCount(0);
  //       setAddedTr(false)
  //       router.push(`/?page=${Number(Math.floor((data.length/5)+1))}&per_page=${5}`);

  //     }

  //   }
  // });
  // })

  //handle insert
  const handleInsert = async (e) => {
    setNewTr(false);
    setFilterCount(0);
    fetchData();
    setInsertCount(insertCount + 1);
    console.log(insertCount);
    if (insertCount === 0) {
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
      fetchData();
      fetchDataCount();
      console.log("data", dataCount);

      targetRef.current?.scrollIntoView({ behavior: "smooth" });
      router.push(
        `/?page=${Number(Math.floor(data.length / 5) + 1)}&per_page=${5}`
      );

      document.querySelector(".newBtn").textContent = "Insert";
      setAddedTr(true);
      // document.querySelector(".insert__form").style.display = "block";
    }
    if (insertCount === 1) {
      document.querySelectorAll(".inputField").forEach((inputField) => {
        inputField.style.backgroundColor = "white";
      });
      if (
        code !== "" &&
        name !== "" &&
        address !== "" &&
        city !== "" &&
        country !== "" &&
        email !== ""
      ) {
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

        document.querySelector(".newBtn").textContent = "New";
        setInsertCount(0);
        setAddedTr(false);
        router.push(
          `/?page=${Number(Math.floor(data.length / 5))}&per_page=${5}`
        );
      } else {
        document.querySelectorAll(".inputField").forEach((inputField) => {
          if (inputField.value === "") {
            inputField.style.backgroundColor = "rgb(236, 144, 144,0.5)";
          }
        });
        setInsertCount(1);
      }
    }
  };

  // add reports
  const [r__name, setNaame] = useState("");
  const [r__email, setEmmail] = useState("");
  const [r__type, setType] = useState("");
  
  const addReports = async () => {
    if (document.querySelector(".doubleClickMessage").value !== "") {
      try {
        const response = await fetch("/api/addReports", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            r__name,
            r__email,
            r__type,
            r__message,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add report");
        }

        setSuccess(true);
        document.querySelector(".AddedSuccessfully").style.display = "block";
    setTimeout(()=>{
      document.querySelector(".AddedSuccessfully").style.display = "none";
    },2000)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

      
    }
    document.querySelector(".doubleClickReportType").value = "select"
    document.querySelector(".doubleClickModal").style.display = "none";
    document.querySelector(".doubleClickName").value = "";
    document.querySelector(".doubleClickEmail").value = "";
    document.querySelector(".doubleClickMessage").value = "";
    

    // clear the input fields right after inserting and fetching data
  };
  //handle filter

  const handleFilter = async () => {
    setFilterCount(filterCount + 1);
    document.querySelector(".newBtn").textContent = "New";
    setAddedTr(false);
    console.log(filterCount);
    setInsertCount(0);
    if (filterCount === 0) {
      setNewTr(true);
      setAddedTr(false);
      setFilterCode("");
      setFilterName("");
      setFilterAddress("");
      setFilterCity("");
      setFilterCountry("");
      setFilterEmail("");

      fetchDataCount();

      // document.querySelector(".new__search__form").style.display = "block";

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
      const filterData = data.filter((client) => {
        if (
          client.code.toLowerCase().includes(filterCode.toLowerCase()) &&
          client.name.toLowerCase().includes(filterName.toLowerCase()) &&
          client.address.toLowerCase().includes(filterAddress.toLowerCase()) &&
          client.city.toLowerCase().includes(filterCity.toLowerCase()) &&
          client.country.toLowerCase().includes(filterCountry.toLowerCase()) &&
          client.mail.toLowerCase().includes(filterEmail.toLowerCase()) &&
          client.active === toggle
        ) {
          return client;
        }
      });

      setData(filterData);

      setStartPage(true);
      router.push(`/?page=${Number(2) - 1}&per_page=${5}`);

      setDataCount(filterData.length);
      setPageNumber(1);

      setPageNumber(1);
      console.log(data);
      document.querySelector(".new__search__form").style.display = "none";
      setFilterCount(0);
      setNewTr(false);
    }
  };

  // removeModal
  const removeModal = () => {
    document.querySelector(".modalArea").style.display = "none";
    document.querySelector(".clientName").textContent = "";
  };

  // handle modal
  const handleModal = (clientName, clientId) => {
    localStorage.setItem("clientId", clientId);
    localStorage.setItem("clientName", clientName);
    document.querySelector(".clientName").textContent =
      localStorage.getItem("clientName");

    document.querySelector(".modalArea").style.display = "flex";
  };

  // handle delete
  const [deleteCounter, setDeleteCounter] = useState(0);
  const handleDelete = async (clientId) => {
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

        // window.location.reload();
        router.push(`/?page=${1}&per_page=${5}`);
        document.querySelector(".modalArea").style.display = "none";
        document.querySelector(".clientName").textContent = "";

        fetchData();

        // Additional actions after successful deletion
      } else {
        //  setMessage('Failed to delete customer. Error: ' + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while deleting customer.");
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
      window.location.reload();
      // setData([]);
      // setFilterCode("");
      // setFilterName("");
      // setFilterAddress("");
      // setFilterCity("");
      // setFilterCountry("");
      // setFilterEmail("");

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

  const Table2Excel = window.Table2Excel;

  const exportTableToExcel = () => {
    var table2excel = new Table2Excel();
    table2excel.export(document.querySelector("#table"));
  };

  const HandleDoubleClick = (clientName, clientEmail) => {
    document.querySelector(".doubleClickModal").style.display = "block";
    document.querySelector(".doubleClickName").value = clientName;
    document.querySelector(".doubleClickEmail").value = clientEmail;
    setNaame(clientName);
    setEmmail(clientEmail);
    
  };

  const removeDoubleClickModal = () => {
    document.querySelector(".doubleClickModal").style.display = "none";
  };

  // import

  const [fileData, setFileData] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        console.log(data);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setData(d);
    });
  };

  // close report modal

  return (
    <div className="content">
      <Header />
      <div className="list__button">
        <h1 className="listTitle">List of Clients : [{dataCount}]</h1>

        <span className="buttons">
          <button
            type="button"
            className="btn btn-primary filterBtn"
            onClick={handleFilter}
          >
            Filter
          </button>

          <br />
          <a href="#new__add__form">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleInsert}
            >
              New
            </button>
          </a>

          <button className="import">Import</button>
          <button
            className="export"
            onClick={() => exportTableToExcel("table")}
          >
            Export
          </button>
        </span>
      </div>

      <span className="insert__form">
        <div className="insert__fields">
          <div className="insert__field">
            <span>Code </span>:
            <input
              type="text"
              placeholder="Code..."
              className="inputField"
              defaultValue={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="insert__field">
            <span>Name : </span>
            <input
              type="text"
              placeholder="Name..."
              className="inputField"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="insert__field">
            <span>Address : </span>
            <input
              type="text"
              placeholder="Address..."
              className="inputField"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="insert__field">
            <span>City : </span>
            <input
              type="text"
              placeholder="City..."
              className="inputField"
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="insert__field">
            <span>Country : </span>
            <input
              type="text"
              placeholder="Country..."
              className="inputField"
              defaultValue={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="insert__field">
            <span>Email : </span>
            <input
              type="text"
              placeholder="Email..."
              className="inputField"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="insert__field">
            {toggle ? (
              <div>
                <span className="activeWord">Active :</span>{" "}
                <ToggleOnIcon
                  className="toggleOn"
                  onClick={() => handleToggle()}
                />
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
          </div>
        </div>
      </span>

      <table id="table" className="table table-striped" ref={tableRef}>
        <thead>
          <tr>
            <th scope="col" className="codeField">
              Code
            </th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {newTr && (
            <tr className="new__search__form" id="new__search__form">
              <td>
                <input
                  type="text"
                  placeholder="search by code"
                  value={filterCode}
                  onChange={(e) => setFilterCode(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="search by name"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="search by address"
                  value={filterAddress}
                  onChange={(e) => setFilterAddress(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="search by city"
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="search by country"
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="search by mail"
                  value={filterEmail}
                  onChange={(e) => setFilterEmail(e.target.value)}
                />
              </td>{" "}
              {toggle ? (
                <td>
                  <ToggleOnIcon
                    className="toggleOn filter__active"
                    onClick={() => handleToggle()}
                  />
                </td>
              ) : (
                <td>
                  <ToggleOffIcon
                    className="toggleOff filter__active"
                    onClick={() => handleToggle()}
                  />
                </td>
              )}
            </tr>
          )}

          {/* slice(0,10) => .slice(start, end) */}
          {data.map((user, index) => (
            <tr
              key={index}
              onDoubleClick={() => HandleDoubleClick(user.name, user.mail)}
            >
              <td className="resizedField">
                {isControlled ? (
                  <input
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    readOnly
                    data-client-id={user.id}
                    value={user.code}
                    className="codeInput"
                  />
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    data-client-id={user.id}
                    defaultValue={user.code}
                    className="codeInput"
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
              <td className="resizedField">
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
              <td className="resizedField">
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
                  onClick={() => handleModal(user.name, user.id)}
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

          {/* {reports.map(reporter=>(
            <h1>{reporter.name}</h1>
          ))} */}

          {addedTr && (
            <tr
              className="new__search__form"
              id="new__add__form"
              ref={targetRef}
            >
              <td>
                <input
                  type="text"
                  placeholder="Add Code..."
                  className="inputField"
                  defaultValue={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Add Name..."
                  className="inputField"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Add Address..."
                  className="inputField"
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Add City..."
                  className="inputField"
                  defaultValue={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Add Country..."
                  className="inputField"
                  defaultValue={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Add Email..."
                  className="inputField"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
              <td>
                {" "}
                {toggle ? (
                  <div>
                    <span className="activeWord">Active :</span>{" "}
                    <ToggleOnIcon
                      className="toggleOn"
                      onClick={() => handleToggle()}
                    />
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
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <PaginationControls
        dataLength={data.length}
        hasNextPage={end < data.length}
        hasPrevPage={start > 0}
        pageNumbers={pageNumber}
      /> */}

      <div className="modalArea">
        <div className="modalContent">
          <div>
            Are you sure you want to delete <span className="clientName"></span>{" "}
            ?
          </div>
          <div className="buttonsModal">
            <button
              onClick={() => handleDelete(localStorage.getItem("clientId"))}
            >
              Yes
            </button>
            <button onClick={removeModal}>No</button>
          </div>
        </div>
      </div>

      {/* double click modal */}
      <table className="doubleClickModal">
        <tr>
          <td>
            <span>Name </span>
          </td>
          <td>
            {" "}
            : <input type="text" className="doubleClickName" />
          </td>
        </tr>

        <tr>
          <td>
            <span>Email </span>
          </td>
          <td>
            {" "}
            : <input type="text" className="doubleClickEmail" />
          </td>
        </tr>
        <tr>
          <td>
            <span>Type </span>
          </td>
          <td>
            {" "}
            : <select name="" className="doubleClickReportType" onChange={(e)=>setType(e.target.value)}>
              <option value="select">select Report type</option>
              <option value="satisfaction">Satisfaction</option>
              <option value="performance ">Performance </option>
              <option value="ReturnorComplaint">Return or Complaint</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <span>Report </span>
          </td>
          <td>
            {" "}
            :{" "}
            <textarea
              className="doubleClickMessage"
              onChange={(e) => setRmessage(e.target.value)}
              name=""
              id=""
            ></textarea>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button onClick={removeDoubleClickModal}>Close</button>
            <button onClick={() => addReports()}>Add</button>
          </td>
        </tr>
      </table>
      <p className="AddedSuccessfully">Report added successfully</p>
      {/* <div className="doubleClickModal">
        <br />
        <span>Name :</span> <input type="text" className="doubleClickName" />
        <br />
        <span>Address :</span>{" "}
        <input type="text" className="doubleClickAddress" />
        <br />
        <span>City :</span> <input type="text" className="doubleClickCity" />
        <br />
        <span>Country :</span>{" "}
        <input type="text" className="doubleClickCountry" />
        <br />
        <span>Email :</span> <input type="text" className="doubleClickEmail" />
        <br />
      </div> */}

      {/* <div className="add__form">
     <table>
        <tbody>
          {" "}
          <tr>
            {" "}
            <td><span>Code</span></td>
            <td>
              :{" "}
              <input
                type="text"
                onChange={(e)=>setCode(e.target.value)}
                placeholder="Type code..."
              />
            </td>
          </tr>
          <tr>
            <td><span>Name</span></td>
            <td>
              {" "}
              :{" "}
              <input
                type="text"
                onChange={(e)=>setName(e.target.value)}

                placeholder="type name..."
              />
            </td>
          </tr>
          <tr>
            {" "}
            <td><span>Address</span></td>
            <td>
              :{" "}
              <input
                type="text"
                onChange={(e)=>setAddress(e.target.value)}

                placeholder="type address..."
              />
            </td>
          </tr>{" "}
          <tr>
            <td><span>City</span></td>
            <td>
              {" "}
              :{" "}
              <input
                type="text"
                onChange={(e)=>setCity(e.target.value)}

                placeholder=" type city..."
              />
            </td>
          </tr>{" "}

          <tr>
            <td><span>Country</span></td>
            <td>
              {" "}
              :{" "}
              <input
                type="text"
                onChange={(e)=>setCountry(e.target.value)}

                placeholder=" type Country..."
              />
            </td>
          </tr>{" "}
          
          <tr>
            <td><span>Email</span></td>
            <td>
              {" "}
              :{" "}
              <input
                type="text"
                onChange={(e)=>setEmail(e.target.value)}

                placeholder=" type Email..."
              />
            </td>
          </tr>{" "}
          <tr>
            <td><span>Active</span></td>
            <td>
            :{toggle ? (
              
               
                <ToggleOnIcon
                  className="toggleOn"
                  onClick={() => handleToggle()}
                />
             
            ) : (
             
               
                <ToggleOffIcon
                  className="toggleOff"
                  onClick={() => handleToggle()}
                />
             
            )}
            </td>
          </tr>{" "}
          
          
          {" "}
          <tr>
            {" "}
            <td colSpan="2" id="add__cancel">
              {" "}
              <span> &nbsp;</span>{" "}
              <span>
                {" "}
                <button>Add</button> <button>cancel</button>{" "}
              </span>{" "}
            </td>{" "}
          </tr>{" "}
        </tbody>
      </table>
     </div> */}

      {/* <nav aria-label="Page navigation example">
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
      </nav> */}
    </div>
  );
}

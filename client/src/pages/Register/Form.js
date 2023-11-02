import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { Button } from "antd";
import { City, Country, State } from "country-state-city";

const initialState = {
  title: "",
  otherNames: "",
  maritalStatus: "",
  email: "",
  occupation: "",
  dob: "",
  gender: "",
  religion: "",
  nextOfKin: "",
  residentialAddress: "",
  localGovernmentArea: "",
  country: "",
  yearOfTravel: "",
  password: "",
  photo: "",
  phone: "",
  bio: "",
};

export const PersonalDetails = ({ next }) => {
  const [user, setUser] = useState(initialState);
  // const [city, setCity] = useState(null);
  // const [country, setCountry] = useState(null);

  const handleInputChange = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const city = City.getCitiesOfState("NG", "ON");
  const country = Country.getAllCountries();
  const year = [
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2003",
    "2002",
    "2001",
    "2000",
    "1999",
    "below 1999",
  ];

  // useEffect(() => {

  // }, [city, country]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    next();
  };

  return (
    <div className="form" style={{}}>
      <h1>Personal Details</h1>
      <div className="form-container">
        <form id="register" onSubmit={handleFormSubmit}>
          <div className="form-field">
            <div>
              <label for="title">Surname</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="surname"
                placeholder="Enter your surname"
                required
              />
            </div>
            <div>
              <label for="title">Other Names</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="otherNames"
                placeholder="Enter other names"
                required
              />
            </div>
          </div>
          <div className="form-field">
            <div>
              <label for="title">Occupation</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="occupation"
                placeholder="Enter your occupation"
                required
              />
            </div>
          </div>
          <div className="form-field">
            <div>
              <label for="title">Date of birth</label>
              <input
                name="dob"
                onChange={handleInputChange}
                type="date"
                required
              />
            </div>
            <div>
              <label for="title">Gender</label>
              <select name="gender" onChange={handleInputChange} required>
                <option value="gender">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <div>
              <label for="title">Email</label>
              <input
                onChange={handleInputChange}
                placeholder="Enter your email"
                type="email"
                name="email"
                required
              />
            </div>
            <div>
              <label for="title">Phone</label>
              <input
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                type="phone"
                name="phone"
                required
              />
            </div>
          </div>
          <div className="form-field">
            <div>
              <label for="title">Residential Address</label>
              <input
                onChange={handleInputChange}
                placeholder="Enter your address"
                type="text"
                name="residentialAddress"
                required
              />
            </div>
          </div>
          <div className="form-field">
            <div>
              <label for="title">Local Government Area</label>
              <select
                name="localGovernmentArea"
                onChange={handleInputChange}
                required
              >
                {city ? (
                  city.map((item, id) => {
                    return (
                      <option key={id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })
                ) : (
                  <option value="">Local Government Area</option>
                )}
              </select>
            </div>
            <div>
              <label for="title">Religion</label>
              <select name="religion" onChange={handleInputChange} required>
                <option value="">Religion</option>
                <option value="christian">Christian</option>
                <option value="muslim">Muslim</option>
                <option value="traditional">Traditional Worshipper</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <div>
              <label for="title">Next Of Kin</label>
              <input
                onChange={handleInputChange}
                placeholder="Enter your next of kin"
                type="text"
                name="nextOfKin"
                required
              />
            </div>
            <div>
              <label for="title">Marital Status</label>
              <select
                name="maritalStatus"
                onChange={handleInputChange}
                required
              >
                <option value="">Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widow">Widow / Widower</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <div>
              <label for="title">Country</label>
              <select name="country" onChange={handleInputChange} required>
                {country ? (
                  country.map((item, id) => {
                    return (
                      <option key={id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })
                ) : (
                  <option value="">Country</option>
                )}
              </select>
            </div>
            <div>
              <label for="title">Year of targetravel</label>
              <select name="yearOfTravel" onChange={handleInputChange} required>
                {year ? (
                  year.map((item, id) => {
                    return (
                      <option key={id} value={item}>
                        {item}
                      </option>
                    );
                  })
                ) : (
                  <option value="">Year</option>
                )}
              </select>
            </div>
          </div>
          <div className="form-field">
            <div>
              <label for="title">Password</label>
              <input
                name="password"
                type="password"
                onChange={handleInputChange}
                placeholder="Enter a password"
              />
            </div>
          </div>

          <button>
            <Button type="primary">Next</Button>
          </button>
        </form>
      </div>
    </div>
  );
};

const businessInitialState = {
  assetType: "",
  businessName: "",
  businessAddress: "",
};

export const BusinessDetails = ({ next }) => {
  const [business, setBusiness] = useState(businessInitialState);
  const handleInputChange = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  const { assetType, businessName, businessAddress } = business;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(business);

    localStorage.setItem(
      "business",
      JSON.stringify({ assetType, businessName, businessAddress })
    );

    next();
  };
  return (
    <div className="form" style={{}}>
      <h1>Business Details</h1>
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <div className="form-field">
            <div>
              <label for="title">You own</label>
              <select name="assetType" onChange={handleInputChange} required>
                <option value="">You own</option>
                <option value="business">Business</option>
                <option value="properties">Properties</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <div>
              <label for="title">Name of Business / Organization</label>
              <input
                name="businessName"
                onChange={handleInputChange}
                type="text"
                placeholder="Enter the name of your business"
              />
            </div>
            <div>
              <label for="title">Address of Business / Organization</label>
              <input
                name="businessAddress"
                onChange={handleInputChange}
                type="text"
                placeholder="Enter the address of your business"
              />
            </div>
          </div>

          <button>
            <Button type="primary">Next</Button>
          </button>
        </form>
      </div>
    </div>
  );
};

export const Finish = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const business = JSON.parse(localStorage.getItem("business"));
    const user = JSON.parse(localStorage.getItem("user"));

    const formData = { ...business, ...user };
    console.log(formData);

    const allEmptyStrings = Object.values(formData).every(
      (value) => value === ""
    );

    const { password, email } = formData;
    if (allEmptyStrings) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    setIsLoading(true);
    try {
      const data = await registerUser(formData);
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="form" style={{}}>
      <h1>Submit Details</h1>
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <button>
            <Button type="primary">Submit </Button>
          </button>
        </form>
      </div>
    </div>
  );
};

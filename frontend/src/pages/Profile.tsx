import { FC, useEffect, useState } from "react";

interface Address {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}

interface UserInfo {
  id: number;
  image: string;
  username: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  bloodGroup: string;
  address: Address;
  company: Company;
  university: string;
}

const Profile: FC = () => {
  const [info, setInfo] = useState<UserInfo>();

  useEffect(() => {
    const userData = {
      id: 1,
      image: "https://via.placeholder.com/200x200/4F46E5/white?text=Igor",
      username: "igor",
      firstName: "Igor",
      lastName: "Aurelio Cunha Paiva",
      maidenName: "",
      age: "",
      gender: "",
      email: "igoraureliocunha@gmail.com",
      phone: "",
      bloodGroup: "",
      address: {
        address: "Rua Alagoas 120",
        city: "",
        postalCode: "",
        state: ""
      },
      company: {
        name: "",
        title: "",
        department: "",
        address: {
          address: "",
          city: "",
          postalCode: "",
          state: ""
        }
      },
      university: ""
    };
    setInfo(userData);
  }, []);

  return (
    <div className="container mx-auto min-h-[83vh] w-full max-w-5xl dark:text-white">
      <h1 className="text-4xl p-4 font-bold font-lora">Your Account</h1>
      <div className="font-karla grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 p-4">
        <img src={info?.image} alt="pp" className="text-center" />
        <table>
          <tbody>
            <tr>
              <td className="font-bold">Username</td>
              <td>{info?.username}</td>
            </tr>
            <tr>
              <td className="font-bold">First Name</td>
              <td>{info?.firstName}</td>
            </tr>
            <tr>
              <td className="font-bold">Last Name</td>
              <td>{info?.lastName}</td>
            </tr>
            <tr>
              <td className="font-bold w-32">Maiden Name</td>
              <td>{info?.maidenName}</td>
            </tr>
            <tr>
              <td className="font-bold">Email</td>
              <td>{info?.email}</td>
            </tr>
            <tr>
              <td className="font-bold">Phone</td>
              <td>{info?.phone}</td>
            </tr>
            <tr>
              <td className="font-bold">University</td>
              <td>{info?.university}</td>
            </tr>
            <tr>
              <td className="font-bold">Age</td>
              <td>{info?.age}</td>
            </tr>
            <tr>
              <td className="font-bold">Gender</td>
              <td>{info?.gender}</td>
            </tr>
            <tr>
              <td className="font-bold">Blood Group</td>
              <td>{info?.bloodGroup}</td>
            </tr>
          </tbody>
        </table>
        <div className="space-y-2">
          <div>
            <h1 className="font-bold">Address</h1>
            <p>{info?.address.address}</p>
            <p>
              {info?.address.city}, {info?.address.postalCode},{" "}
              {info?.address.state}
            </p>
          </div>
          <div>
            <h1 className="font-bold">Company</h1>
            <p>{info?.company.name}</p>
            <p>{info?.company.title}</p>
            <p>{info?.company.department}</p>
            <p>{info?.company.address.address}</p>
            <p>
              {info?.company.address.city}, {info?.company.address.postalCode},{" "}
              {info?.company.address.state}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

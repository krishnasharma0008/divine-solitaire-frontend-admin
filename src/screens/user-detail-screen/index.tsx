import { MetaDetailsCard } from "@/components/common";
import SectionContainer from "./sub-components/section-container";
import InputText from "@/components/common/input-text";
import { useEffect, useReducer, useState } from "react";
import { Portfolio, User, Wishlist } from "@/interface";
import { getUserDetail } from "@/api";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";
import { portfolioColumns, wishlistColumns } from "./user-detail-screen-table-columns";
import Link from "next/link";

interface UserDetailAction {
  type: string;
  payload: User | string;
}

const initialState: User = {
  aadhar: "",
  address: "",
  ceatedat: "",
  city: "",
  contactno: "",
  doanniv: "",
  dob: "",
  drivinglic: "",
  email: "",
  fname: "",
  id: 0,
  lactivity: "",
  lactivityat: "",
  lname: "",
  pan: "",
  pfimage: "",
  pincode: "",
  state: "",
  vsource: "",
};

const UserDetailReducer = (state: User, action: UserDetailAction) => {
  if (action.type === "ALL") {
    return { ...state, ...(action.payload as unknown as User) };
  }
  return { ...state, [action.type]: action.payload };
};

const calculateTotalPortfolioAmt = (portfolio: Array<Portfolio>): number =>
  portfolio.reduce(
    (acc: number, item: { current_price: number }) => acc + item.current_price,
    0
  );

const UserDetailScreen: React.FC = () => {
  const [state, dispatch] = useReducer(UserDetailReducer, initialState);
  const [portfolio, setPortfolio] = useState<Array<Portfolio>>([]);
  const [wishlist, setWishlist] = useState<Array<Wishlist>>([]);

  const { query } = useRouter();

  useEffect(() => {
    if (!query.id) {
      return;
    }

    getUserDetail(query?.id as unknown as number)
      .then((res) => {
        dispatch({
          type: "ALL",
          payload: { ...res.data.data.userInfo },
        });
        setPortfolio(res.data.data.portfolio);
        setWishlist(res.data.data.Wishlist);
      })

      .catch((err) => {
        console.log("errr", err);
      });
  }, [query?.id]);

  // const onSubmitHandler = () => {
  //   // TODO: submit the form
  //   // Take reference from insurance-detail-screen
  //   push("/admin/user");
  // };

  // const onChangeHandlerCreator = (fieldname: string) => {
  //   return (e: React.ChangeEvent<HTMLInputElement>) =>
  //     dispatch({
  //       type: fieldname,
  //       payload: (e.target as HTMLInputElement).value,
  //     });
  // };

  const CustomStyles = {

    headRow: {
      style: {
        borderBottomWidth: "0",
      },
    },
    rows: {
      style: {
        "&:not(:last-of-type)": {
          borderBottomWidth: "0",
          borderBottomColor: "white",
          justifyContent: "center",
        },
      },
    },
  };

  return (
    <div className="flex-1 w-full mt-1 bg-gray-50 pt-10 px-4 rounded-lg">
      <SectionContainer>
        <MetaDetailsCard
          label="User Activity :"
          fields={[
            { name: "Source", value: state?.vsource },
            {
              name: "Date of sign Up",
              value: "18th Jan,2023",
            } /*value: dayjs(state.etype).format("YYYY-MM-DD")*/,
            { name: "Last Activity Date", value: "18th Jan,2023" },
            {
              name: "Purchase Amount",
              value: `${calculateTotalPortfolioAmt(portfolio)}`,
            },
            { name: "Active request", value: "Yes" },
          ]}
        />
      </SectionContainer>

      <SectionContainer className="mt-6">
        <div>
          <h1 className="py-2 font-medium text-base pl-5">
            Personal Details :
          </h1>
        </div>
        <div className="flex-row pt-5 mx-4">
          <InputText
            className="w-full"
            label="Name"
            name="name"
            placeholder="Name"
            type="text"
            value={state?.fname || ""}
            // onChange={onChangeHandlerCreator("fname")}
          />

          <div className="flex justify-between pt-5 ">
            <InputText
              className="w-full"
              label="Email"
              name="email"
              placeholder="Email"
              type="text"
              // onChange={onChangeHandlerCreator("email")}
              value={state?.email || ""}
            />
            <InputText
              className="w-full"
              label="Mobile No."
              name="mno"
              placeholder="Mobile No."
              type="text"
              // onChange={onChangeHandlerCreator("contactno")}
              value={state?.contactno || ""}
            />
          </div>
        </div>

        <div className="flex-row pt-5 mx-4">
          <InputText
            className="w-full"
            label="Address"
            name="address"
            placeholder="Address"
            type="text"
            // onChange={onChangeHandlerCreator("address")}
            value={state?.address || ""}
          />

          <div className="flex justify-between pt-5 ">
            <InputText
              label="State"
              name="state"
              placeholder="State"
              type="text"
              // onChange={onChangeHandlerCreator("state")}
              value={state?.state || ""}
            />
            <InputText
              label="City"
              name="city"
              placeholder="City"
              type="text"
              value={state?.city || ""}
              // onChange={onChangeHandlerCreator("city")}
            />
            <InputText
              label="Pin Code"
              name="pincode"
              placeholder="Pin Code"
              type="text"
              // onChange={onChangeHandlerCreator("pincode")}
              value={state?.pincode || ""}
            />
          </div>
          <div className="flex justify-between pt-5 ">
            <InputText
              label="Date of Birth"
              name="dob"
              placeholder="Date Of Birth"
              type="date"
              value={dayjs(state?.dob).format("YYYY-MM-DD")}
              // onChange={onChangeHandlerCreator("dob")}
            />
            <InputText
              label="Date of Anniversary"
              name="doanniv"
              placeholder="Date Of Anniversary"
              type="date"
              value={dayjs(state?.doanniv).format("YYYY-MM-DD")}
              // onChange={onChangeHandlerCreator("doanniv")}
            />
          </div>
        </div>
      </SectionContainer>
      {portfolio && (
        <SectionContainer className="flex-1 pt-5 mt-6">
          <div className="flex-1 w-full">
            <div className="bg-white ">
              <div>                
                <DataTable
                  //title={concat("Portfolio           Total Portfolio Value - ₹ " , `${calculateTotalPortfolioAmt(portfolio)}`)}
                  title = "Portfolio"
                  columns={portfolioColumns}
                  data={portfolio}
                  customStyles={CustomStyles}
                  subHeader
                  subHeaderComponent={
                    <span className="flex select-none text-gray-500 text-left sm:text-sm">Total Portfolio Value - ₹ {calculateTotalPortfolioAmt(portfolio)}</span>
                  }
                />
              </div>
            </div>
          </div>
        </SectionContainer>
      )}
      {wishlist && (
        <SectionContainer className="flex-1 pt-5 mt-6">
          <div className="flex-1 w-full">
            <div className="bg-white ">
              <div className="">
                <DataTable
                  title="Wishlist"
                  columns={wishlistColumns}
                  data={wishlist}
                  customStyles={CustomStyles}
                />
              </div>
            </div>
          </div>
        </SectionContainer>
      )}

      <SectionContainer className="mt-6">
        <div className="mt-6 flex items-center justify-center gap-x-6 my-5 py-5">
          <Link href="/admin/user" >
            <button
              type="submit"
              //onClick={onSubmitHandler}
              className="inline-flex items-center justify-center px-4 py-2 bg-Chinese-Black-sidebar border border-transparent rounded-md font-semibold capitalize text-white hover:bg-Chinese-Black-sidebar active:bg-Chinese-Black-sidebar focus:outline-none focus:bg-Chinese-Black-sidebar focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              Close
            </button>
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
};

export default UserDetailScreen;

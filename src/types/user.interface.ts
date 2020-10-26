interface UserProps {
  company_id: number;
  user_unique_reference: string;
  hustle_name: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  date_of_birth: Date;
  mobile_number: string;
  gender: string;
  email_address: string;
  pin_code: string;
  ip_address: string;
  verified: string;
  date_created: string;
  password: string;
}

export default UserProps;

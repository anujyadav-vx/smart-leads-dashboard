import {
  useForm
} from "react-hook-form";

import Input from "../ui/Input";
import Button from "../ui/Button";

export interface LeadFormData {
  name: string;
  email: string;
  status: string;
  source: string;
}

interface LeadFormProps {
  defaultValues?: LeadFormData;

  onSubmit: (
    data: LeadFormData
  ) => Promise<void>;
}

const LeadForm = ({
  defaultValues,
  onSubmit
}: LeadFormProps) => {

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<LeadFormData>({
    defaultValues
  });

  return (

    <form
      onSubmit={
        handleSubmit(onSubmit)
      }
    >

      <Input
        label="Name"
        placeholder="Enter name"
        {...register("name")}
      />

      <Input
        label="Email"
        placeholder="Enter email"
        {...register("email")}
      />

      <div className="mb-4">

        <label
          className="
          block
          mb-2
          text-sm
          font-medium
        "
        >
          Status
        </label>

        <select
          {...register("status")}
          className="
          w-full
          border
          rounded-lg
          px-4
          py-2
        "
        >

          <option value="New">
            New
          </option>

          <option value="Contacted">
            Contacted
          </option>

          <option value="Qualified">
            Qualified
          </option>

          <option value="Lost">
            Lost
          </option>

        </select>

      </div>

      <div className="mb-6">

        <label
          className="
          block
          mb-2
          text-sm
          font-medium
        "
        >
          Source
        </label>

        <select
          {...register("source")}
          className="
          w-full
          border
          rounded-lg
          px-4
          py-2
        "
        >

          <option value="Website">
            Website
          </option>

          <option value="Instagram">
            Instagram
          </option>

          <option value="Referral">
            Referral
          </option>

        </select>

      </div>

      <Button type="submit">

        {
          isSubmitting
            ? "Saving..."
            : "Save Lead"
        }

      </Button>

    </form>
  );
};

export default LeadForm;
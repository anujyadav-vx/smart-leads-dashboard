import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import type { LeadFormData, LeadStatus, LeadSource } from "../../types/lead.types";

interface LeadFormProps {
  defaultValues?: Partial<LeadFormData>;
  onSubmit: (data: LeadFormData) => Promise<void>;
  onCancel?: () => void;
  isEditing?: boolean;
}

const LeadForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isEditing = false,
}: LeadFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      status: defaultValues?.status || ("New" as LeadStatus),
      source: defaultValues?.source || ("Website" as LeadSource),
      value: defaultValues?.value || 0,
      notes: defaultValues?.notes || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Alex Morgan"
          error={errors.name?.message}
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          })}
        />

        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. alex@company.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="e.g. +1 (555) 123-4567"
          {...register("phone")}
        />

        <Input
          label="Deal Value ($)"
          type="number"
          step="any"
          placeholder="e.g. 5000"
          {...register("value", {
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            Pipeline Status
          </label>
          <select
            {...register("status")}
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm outline-hidden focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            Lead Source
          </label>
          <select
            {...register("source")}
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm outline-hidden focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Facebook">Facebook</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
          Notes & Details
        </label>
        <textarea
          rows={3}
          placeholder="Key pain points, meeting notes, or budget details..."
          {...register("notes")}
          className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm outline-hidden focus:ring-2 focus:ring-indigo-500 transition placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            fullWidth={false}
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth={false}
          isLoading={isSubmitting}
        >
          {isEditing ? "Update Lead" : "Create Lead"}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;
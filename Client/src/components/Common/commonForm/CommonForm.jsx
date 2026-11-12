import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const CommonForm=({formControls,formData,setFormData,onSubmit,buttonText}) =>{
  const  renderInputByComponentType=(control) =>{
    switch (control.componentType) {
      case "input":
        return (
          <Input
            type={control.type}
            placeholder={control.placeholder}
            value={formData[control.name] || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                [control.name]: e.target.value,
              })
            }
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={control.placeholder}
            value={formData[control.name] || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                [control.name]: e.target.value,
              })
            }
          />
        );


        
case "select":
  return (
    <Select
      value={formData[control.name] || ""} // ✅ IMPORTANT
      onValueChange={(value) =>
        setFormData({
          ...formData,
          [control.name]: value,
        })
      }
    >
      <SelectTrigger>
        <SelectValue placeholder={`Select ${control.label}`} />
      </SelectTrigger>
      <SelectContent>
        {control.options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

      default:
        return null;
    }
  }

  return (
    
    <form
  onSubmit={(e) => {
    e.preventDefault();
    onSubmit(e); // ✅ pass event
  }}
  className="space-y-4"
>
      {formControls.map((control) => (
        <div className="pl-5" key={control.name}>
          <label className="block mb-1  text-sm font-medium">
            {control.label}
          </label>
          {renderInputByComponentType(control)}
        </div>
      ))}

     <Button type="submit">
  {buttonText || "Submit"}
</Button>
    </form>
  );
}
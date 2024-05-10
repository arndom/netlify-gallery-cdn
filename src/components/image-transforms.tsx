import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Slider } from "@nextui-org/slider";
import { Checkbox } from "@nextui-org/checkbox";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import {
  TransformsKeysT,
  TransformsT,
  defaultTransforms,
  fits,
  formats,
  maxHeight,
  maxQuality,
  maxWidth,
  minHeight,
  minQuality,
  minWidth,
} from "@/data";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  transforms: TransformsT;
  setTransforms: Dispatch<SetStateAction<TransformsT>>;
  resetTransforms: () => void;
}

const ImageTransforms = (props: Props) => {
  const { transforms, setTransforms, resetTransforms } = props;
  const [clonedTransforms, setClonedTransforms] =
    useState<TransformsT>(transforms);

  const updateTransforms = (current: Partial<TransformsT>) => {
    setClonedTransforms((prev) => ({
      ...prev,
      ...current,
    }));
  };

  const handleChange = (key: TransformsKeysT, value: any) => {
    let entry = { [key]: value };

    if (key === "quality" && value === 0) {
      entry = { quality: minQuality };
    }

    return updateTransforms({
      ...entry,
    });
  };

  const applyChanges = () => {
    setTransforms(clonedTransforms);
  };

  const resetChanges = () => {
    resetTransforms();
    setClonedTransforms(defaultTransforms);
  };

  return (
    <Popover placement="top">
      <PopoverTrigger>
        <button className="styled-btn">Transforms</button>
      </PopoverTrigger>

      <PopoverContent className="w-[500px] max-w-xs sm:max-w-md p-4 py-5 px-6 flex flex-col gap-4 items-start">
        <Slider
          label="Width"
          step={10}
          color="foreground"
          maxValue={maxWidth}
          minValue={minWidth}
          onChange={(value) => handleChange("width", value)}
          value={clonedTransforms.width}
          className="max-w-md"
        />

        <div className="w-full">
          <Slider
            isDisabled={clonedTransforms.autoHeight}
            label="Height"
            step={10}
            color="foreground"
            maxValue={maxHeight}
            minValue={minHeight}
            onChange={(value) => handleChange("height", value)}
            value={clonedTransforms.height}
            className="max-w-md"
          />

          <Checkbox
            onValueChange={(value) => handleChange("autoHeight", value)}
            isSelected={clonedTransforms.autoHeight}
            color="default"
            classNames={{
              label: "text-small",
            }}
          >
            Auto-Height
          </Checkbox>
        </div>

        <Slider
          size="md"
          step={5}
          color="foreground"
          label="Quality"
          showSteps={true}
          maxValue={maxQuality}
          minValue={0} // min actually 1, 0 for the sake of implementation
          onChange={(value) => handleChange("quality", value)}
          value={clonedTransforms.quality}
          className="max-w-md"
        />

        <RadioGroup
          onValueChange={(value) => handleChange("fit", value)}
          value={clonedTransforms.fit}
          label="Object-Fit"
          orientation="horizontal"
          color="default"
        >
          {fits.map((fit) => (
            <Radio
              key={fit}
              value={fit}
              classNames={{
                label: "capitalize",
              }}
            >
              {fit}
            </Radio>
          ))}
        </RadioGroup>

        <RadioGroup
          onValueChange={(value) => handleChange("format", value)}
          value={clonedTransforms.format}
          label="Format"
          orientation="horizontal"
          color="default"
        >
          {formats.map((format) => (
            <Radio key={format} value={format}>
              .{format}
            </Radio>
          ))}
        </RadioGroup>

        <div className="ml-auto flex gap-1">
          <Button
            radius="full"
            className="chapters-btn unanimated font-semibold"
            onPress={applyChanges}
          >
            Apply
          </Button>
          <Button
            radius="full"
            className="bg-white text-black border font-semibold"
            onPress={resetChanges}
          >
            Reset
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ImageTransforms;

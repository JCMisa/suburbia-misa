import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Fragment, JSX } from "react";
import { Skater } from "./Skater";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid = async ({ slice }: TeamGridProps): Promise<JSX.Element> => {
  const client = createClient();
  const skaters = await client.getAllByType("skater");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <Heading size="lg" as="h2" className="mb-8 text-center text-white">
        <PrismicText field={slice.primary.heading} />
      </Heading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {skaters.map((skater, index) => (
          <Fragment key={index}>
            {skater.data.first_name && <Skater skater={skater} />}
          </Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;

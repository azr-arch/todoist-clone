import { Section as SectionType, Task } from "@prisma/client";
import { Section } from "./section";
import { AddSectionBtn } from "./add-section-btn";

interface SectionContainerProps {
    data?: (SectionType & {
        tasks?: Task[];
    })[];
}

export const SectionContainer = ({ data }: SectionContainerProps) => {
    return (
        <ul className="w-full">
            {data && data.length > 0
                ? data.map((section) => (
                      <li key={section.id} className="w-full">
                          <Section data={section} />
                          <div className="mt-5 mb-3">
                              <AddSectionBtn prevOrder={section.order} />
                          </div>
                      </li>
                  ))
                : null}
        </ul>
    );
};

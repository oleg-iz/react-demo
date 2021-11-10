interface ClassObject
{
  [name: string]: boolean | null | undefined;
}

type ClassArray = ClassValue[];

export type ClassValue = string | ClassObject | ClassArray | null | undefined;

export class ClassNames
{
  private static joinObject(classObject: ClassObject, classes: string[]): void
  {
    for (const key in classObject)
    {
      if (classObject[key])
      {
        classes.push(key);
      }
    }
  }

  private static joinArray(classArray: ClassArray, classes: string[]): void
  {
    for (const classValue of classArray)
    {
      this.joinValue(classValue, classes);
    }
  }

  private static joinComplex(classValue: ClassObject | ClassArray, classes: string[]): void
  {
    if (Array.isArray(classValue))
    {
      this.joinArray(classValue, classes);
    }
    else
    {
      this.joinObject(classValue, classes);
    }
  }

  private static joinValue(classValue: ClassValue, classes: string[]): void
  {
    if (classValue !== undefined && classValue !== null)
    {
      if (typeof classValue === "string")
      {
        if (classValue !== "")
        {
          classes.push(classValue);
        }
      }
      else
      {
        this.joinComplex(classValue, classes);
      }
    }
  }

  public static join(classValue: ClassValue): string
  {
    if (classValue === undefined || classValue === null)
    {
      return "";
    }
    else if (typeof classValue === "string")
    {
      return classValue;
    }
    else
    {
      const classes = new Array<string>();
      this.joinComplex(classValue, classes);
      return classes.join(" ");
    }
  }
}
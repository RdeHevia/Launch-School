type FunctionExample = (parameter1:number, parameter2: string) => boolean;

const func1: FunctionExample = function (nbr, str) {
  return String(nbr) === str;
}

const func2: FunctionExample = function (str, nbr) {
  return String(nbr) === str;
}

func1(123, '123'); // OK
func2('123',123); // Argument of type 'string' is not assignable to parameter of type 'number'.
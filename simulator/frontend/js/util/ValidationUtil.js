export class ValidationUtil {
    hasStrArrayNullEmpty(array){
        for(let i=0; i<array.length; i++) {
            if (this.isStrNullEmpty(array[i]))
                return true;
        }

        return false;
    }

    isStrNullEmpty(str) {
        return str == null || /^\s*$/.test(str);
    }
}
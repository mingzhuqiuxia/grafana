import { Field, DataFrame } from '../../types/dataFrame';
import { FieldMatcherID, FrameMatcherID } from './ids';
import { FieldMatcherInfo, FrameMatcherInfo } from '../../types/transformations';
import { stringToJsRegex } from '../../text/string';
import { getFieldDisplayName } from '../../field/fieldState';

// General Field matcher
const fieldNameMacher: FieldMatcherInfo<string> = {
  id: FieldMatcherID.byName,
  name: 'Field Name',
  description: 'match the field name',
  defaultOptions: '/.*/',

  get: (pattern: string) => {
    let regex = new RegExp('');
    try {
      regex = stringToJsRegex(pattern);
    } catch (e) {
      console.error(e);
    }
    return (field: Field) => {
      return regex.test(getFieldDisplayName(field) ?? '');
    };
  },

  getOptionsDisplayText: (pattern: string) => {
    return `Field name: ${pattern}`;
  },
};

// General Field matcher
const frameNameMacher: FrameMatcherInfo<string> = {
  id: FrameMatcherID.byName,
  name: 'Frame Name',
  description: 'match the frame name',
  defaultOptions: '/.*/',

  get: (pattern: string) => {
    const regex = stringToJsRegex(pattern);
    return (frame: DataFrame) => {
      return regex.test(frame.name || '');
    };
  },

  getOptionsDisplayText: (pattern: string) => {
    return `Frame name: ${pattern}`;
  },
};

/**
 * Registry Initalization
 */
export function getFieldNameMatchers(): FieldMatcherInfo[] {
  return [fieldNameMacher];
}

export function getFrameNameMatchers(): FrameMatcherInfo[] {
  return [frameNameMacher];
}

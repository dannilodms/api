export default interface HashGenerator {
  hash(text: string): Promise<string>;
  compare(text: string, hash: string): Promise<boolean>;
}

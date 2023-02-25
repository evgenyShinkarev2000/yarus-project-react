import styles from "./AuthFormTemplate.module.scss";

export function AuthFormTemplate(props: any){
  
  return (
    <div className={styles.formCard}>
      {props.children}
    </div>
  )
}
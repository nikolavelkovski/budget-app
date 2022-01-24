import React from "react";
import { Card, ProgressBar, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils.js/utils";
import { getProgressBarVariant } from "../utils.js/utils";
export default function BudgetCard(props) {
  const classNames = [];

  if (props.amount > props.maxAmount) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (props.gray) {
    classNames.push("bg-light");
  }
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between fw-normal mb-3">
          <h3>{props.name}</h3>
          <p>
            <span>{currencyFormatter.format(props.amount)}</span>
            {props.maxAmount && (
              <span> / {currencyFormatter.format(props.maxAmount)} </span>
            )}{" "}
          </p>
        </Card.Title>
        {props.maxAmount && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(props.maxAmount, props.amount)}
            min={0}
            max={props.maxAmount}
            now={props.amount}
          />
        )}

        {!props.hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              className="ms-auto"
              variant="outline-primary"
              onClick={props.onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button
              variant="outline-secondary"
              onClick={props.onViewExpenseClick}
            >
              View Expense
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

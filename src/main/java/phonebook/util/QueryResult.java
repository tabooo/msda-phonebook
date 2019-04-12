package phonebook.util;

import java.io.Serializable;

public class QueryResult<T, N, S> implements Serializable {
	private static final long serialVersionUID = 1L;

	private T result;

	private N count;

	private S sum;

	public T getResult() {
		return result;
	}

	public void setResult(T result) {
		this.result = result;
	}

	public N getCount() {
		return count;
	}

	public void setCount(N count) {
		this.count = count;
	}

	public S getSum() {
		return sum;
	}

	public void setSum(S sum) {
		this.sum = sum;
	}
}
